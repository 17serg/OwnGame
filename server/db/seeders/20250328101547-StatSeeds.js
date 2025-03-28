'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Хэшируем пароли с использованием bcrypt
    const saltRounds = 10;
    const hashedPasswordSergey = await bcrypt.hash('password123', saltRounds);
    const hashedPasswordMax = await bcrypt.hash('password123', saltRounds);
    const hashedPasswordVika = await bcrypt.hash('password123', saltRounds);

    // Добавляем пользователей
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Великий Мемолог',
          email: 'sergey@example.com',
          password: hashedPasswordSergey,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Юлия Высоцкая',
          email: 'max@example.com',
          password: hashedPasswordMax,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Сотрудник Кинопоиска',
          email: 'vika@example.com',
          password: hashedPasswordVika,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // Добавляем игры для пользователей
    await queryInterface.bulkInsert(
      'Games',
      [
        {
          userId: 1, // ID Сергея (замените на реальный ID после добавления пользователей)
          score: 5500,
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2, // ID Макса
          score: 2000,
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3, // ID Вики
          score: 5000,
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1, // ID Сергея
          score: 2700,
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2, // ID Макса
          score: 210,
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3, // ID Вики
          score: 1900,
          status: 'completed',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Удаляем данные
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Games', null, {});
  },
};