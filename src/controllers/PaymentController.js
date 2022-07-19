import paypal from 'paypal-rest-sdk';
import dotenv from 'dotenv';
import AppError from './../utils/appError';
import catchAsync from './../utils/catchAsync';
import model from './../database/models';

dotenv.config();

/**
 * Models
 */

const User = model.User;
const Payment = model.Payment;

/**
 * Paypal configurations
 */

paypal.configure({
  mode: process.env.PAYPAL_MODE,
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

/**
 * Declaring empty object to copy info of loggedIn user 
 */

let user = {};

export const makePayment = catchAsync(async (req, res, next) => {
  /**
   * Get product information
   */

  user = { ...req.user };

  const { productName, price, quantity } = req.body;

  /**
   * Payment creation Json declaration
   */
  
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: process.env.PAYMENT_METHOD,
    },
    redirect_urls: {
      return_url: process.env.PAYPAL_REDIRECT_URL,
      cancel_url: process.env.PAYPAL_CANCEL_URL,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: productName,
              price: price,
              currency: process.env.PAYPAL_CURRENCY,
              quantity: quantity,
            },
          ],
        },
        amount: {
          currency: process.env.PAYPAL_CURRENCY,
          total: price,
        },
        description: 'Plan upgrading',
      },
    ],
  };

  /**
   * Iniating payement and generating a user redirection link
   */

  paypal.payment.create(create_payment_json, function (error, payment) {
    let redireactionUrl;

    if (error) {
      return next(new AppError(error.message, 400));
    }

    for (let i = 0; i < payment.links.length; i++) {
      if (payment.links[i].rel === process.env.PAPAY_APPROVAL_URL) {
        redireactionUrl = payment.links[i].href;
      }
    }

    res.status(200).json({
      status: 'success',
      message: 'Payment initiated successfully',
      data: {
        url: redireactionUrl,
        paymentId: payment.id,
        Token: redireactionUrl.split('token=')[1],
        
      },
    });
  });
});

export const onSucess = catchAsync(async (req, res, next) => {
  /**
   * Getting paymentId and PayerID after user approved payment
   */

  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: '20',
        },
      },
    ],
  };

  /**
   * Executing payment
   */

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async (error, payment) => {
      if (error) {
        return next(new AppError(error.message, 400));
      }

      /**
       * Defining all necessary payer data to be saved in our database
       */

      let paymentId,
        state,
        payerStatus,
        payerEmail,
        payerFirstName,
        payerLastName,
        payerId,
        payeeName,
        payeeEmail,
        payeeMerchantId,
        totalAmount,
        currency,
        productName;

      /**
       *  Get some payer data from payment
       * those data do not require to loop through paymeny object
       */

      paymentId = payment.id;
      state = payment.state;
      payerStatus = payment.payer.status;
      payerEmail = payment.payer.payer_info.email;
      payerFirstName = payment.payer.payer_info.first_name;
      payerLastName = payment.payer.payer_info.last_name;
      payerId = payment.payer.payer_info.payer_id;
      payeeName = payment.payer.payer_info.shipping_address.recipient_name;

      /**
       * Get the rest of payer data that require looping through payment object
       */

      for (let i = 0; i < payment.transactions.length; i++) {
        if (payment.transactions[i].rel === process.env.PAPAY_APPROVAL_URL) {
          redireactionUrl = payment.links[i].href;
        }
        totalAmount = payment.transactions[i].amount.total;
        currency = payment.transactions[i].amount.currency;
        payeeMerchantId = payment.transactions[i].payee.merchant_id;
        payeeEmail = payment.transactions[i].payee.email;
        productName = payment.transactions[i].item_list.items[0].name;
      }

      /**
       *  Save a successfully payment in our database
       */

      const newPayment = await Payment.create({
        paymentId,
        state,
        payerStatus,
        payerEmail,
        payerFirstName,
        payerLastName,
        payerId,
        payeeName,
        payeeEmail,
        payeeMerchantId,
        totalAmount,
        currency,
        productName,
        userId: user.dataValues.id,
      });

      /**
       * Only if payment is done and data successfully saved wecan now update user plan
       */

      if (newPayment) {
        await User.update(
          {
            roleName: productName,
            paidPlan: productName,
            isPaid: true,
          },
          {
            where: { uuid: user.dataValues.uuid },
          }
        );
      }

      res.status(200).json({
        status: 'success',
        message: 'Payment Done successfully ',
        data: {
          newPayment,
        },
      });
    }
  );
});

/**
 * In case the user want to cancel payment
 */

export const onCancel = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'cancelled',
  });
});


export const getPaymentInfo = catchAsync(async (req, res, next) => {
  /**
   * Get payment id(uuid)
   */

  const uuid = req.params.uuid;

  /**
   * Find payment by id(uuid)
   */

  const paymentInfo = await Payment.findOne({ where: { uuid },include:['user']});

  if (!paymentInfo) {
    return next(new AppError('No Payment found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      payment: paymentInfo,
    },
  });
});

export const getAllPaymentInfo = catchAsync(async (req, res, next) => {
  const allPayementInfo = await Payment.findAll();

  res.status(200).json({
    status: 'success',
    data: {
      payments: allPayementInfo,
    },
  });
});

export const deletePaymentInfo = catchAsync(async (req, res, next) => {
  /**
   * Get PaymentInfo id(uuid)
   */

  const uuid = req.params.uuid;

  /**
   * Check if Payment is there
   */

  const paymentInfo = await Payment.findOne({ where: { uuid } });

  /**
   * Send Back error Message if no Payment found with provided ID
   */

  if (!paymentInfo) {
    return next(new AppError('No payment found with That ID', 404));
  }

  /**
   * delete a payment
   */

  await Payment.destroy({ where: { uuid } });

  /**
   * Send a generic message after deleting
   */

  res.status(200).json({
    status: 'success',
    message: 'Payment deleted successfully',
  });
});
