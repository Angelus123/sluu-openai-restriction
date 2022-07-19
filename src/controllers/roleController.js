import model from './../database/models';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

const Role = model.Role;

export const createRole = catchAsync(async (req, res, next) => {

  const { roleName } = req.body;

  /**
   * Check if role is not empty
   */

  if (roleName == '') {
    return next(new AppError('Role Name should not be empty', 400));
  }

  
  /**
   * Check if role is not already existing
   */

  const role = await Role.findOne({ where: { roleName } });

  if (role) {
    return next(new AppError('Role is already existing', 404));
  }

  /**
   * create a new role
   */

  const newRole = await Role.create({
    roleName,
  });

  res.status(200).json({
    status: 'success',
    data: {
      newRole,
    },
  });
});

export const getAllRoles = catchAsync(async (req, res, next) => {

  /**
   * fetching all roles
   */

  const allRoles = await Role.findAll();

  res.status(200).json({
    status: 'succes',
    result: allRoles.length,
    data: {
      roles: allRoles,
    },
  });

});

export const getRole = catchAsync(async (req, res, next) => {

  /**
   * Find role by Id
   */

  const uuid = req.params.uuid;

  /**
   * Find role by Id and return all users assigned to this role
   */

  const role = await Role.findOne({
    where: { uuid },
    include:['users']
  });

  /**
   * Send error message if no role found with that ID
   */

  if (!role) {
    return next(new AppError('No role found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      role,
    },
  });
});

export const updateRole = catchAsync(async (req, res, next) => {

  /**
   * Update Role based on id(uuid)
   */

  const uuid = req.params.uuid;
  const {roleName} = req.body;

  /**
   * Find role by id(uuid)
   */

  const role = await Role.findOne({
    where: { uuid },
  });

  /**
   * Send error message if no role found with that ID
   */

  if (!role) {
    return next(new AppError('No role found with that ID', 404));
  }

/**
 *  updating role
 */

  await Role.update({roleName},{where:{uuid}})
  
 
  res.status(200).json({
    status: 'success',
    message: 'Role Updated successfully',
  });
});

export const deleteRole = catchAsync(async (req, res, next) => {

  /**
   * Delete role by id(uuid)
   */
  const uuid = req.params.uuid;

/**
 * Find role by id(uuid)
 */
  const role = await Role.findOne({
    where: { uuid },
  });

/**
 * Send error message if no role found with that ID
 */

  if (!role) {
    return next(new AppError('No role found with that ID', 404));
  }

  await role.destroy();

  res.status(200).json({
    status: 'success',
    message: 'Role deleted successfully',
  });
});
