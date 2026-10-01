import {
  findAllUsers,
  findRequestsByUserId,
  findUserById
} from '../services/userService.js';

export function getUsers(req, res) {
  res.json(findAllUsers());
}

export function getUserRequests(req, res) {
  const userId = Number(req.params.id);

  if (!Number.isInteger(userId)) {
    return res.status(400).json({
      error: 'รหัสผู้ใช้ไม่ถูกต้อง'
    });
  }

  const user = findUserById(userId);

  if (!user) {
    return res.status(404).json({
      error: 'ไม่พบผู้ใช้'
    });
  }

  res.json(findRequestsByUserId(userId));
}