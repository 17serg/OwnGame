'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Questions',
      [
        {
          "category": "Мифология",
          "score": 100,
          "question": "Как зовут древнегреческого бога войны?",
          "answer1": "Зевс",
          "answer2": "Геракл",
          "answer3": "Арес",
          "answer4": "Гефест",
          "correctAnswer": "Арес"
        },
        {
          "category": "Мифология",
          "score": 200,
          "question": "Какой бог в древнегреческой мифологии был известен своим мастерством кузнечного дела?",
          "answer1": "Артемида",
          "answer2": "Арес",
          "answer3": "Гефест",
          "answer4": "Зевс",
          "correctAnswer": "Гефест"
        },
        {
          "category": "Мифология",
          "score": 300,
          "question": "Как называется мифическое существо с головой и шеей женщины и телом льва?",
          "answer1": "Гидра",
          "answer2": "Сфинкс",
          "answer3": "Минотавр",
          "answer4": "Цербер",
          "correctAnswer": "Сфинкс"
        },
        {
          "category": "Мифология",
          "score": 400,
          "question": "Какая богиня считалась покровительницей мудрости и войны в древнегреческой мифологии?",
          "answer1": "Артемида",
          "answer2": "Афина",
          "answer3": "Гера",
          "answer4": "Деметра",
          "correctAnswer": "Афина"
        },
        {
          "category": "Мифология",
          "score": 500,
          "question": "Какой герой древнегреческой мифологии выполнил 12 подвигов и победил Лернейскую гидру?",
          "answer1": "Геракл",
          "answer2": "Персей",
          "answer3": "Тесей",
          "answer4": "Ахилл",
          "correctAnswer": "Геракл"
        },
      
        {
          "category": "Мемы",
          "score": 100,
          "question": "Как называется мем с изображением кота, который делает грустное лицо?",
          "answer1": "Грустный кот",
          "answer2": "Печальный кот",
          "answer3": "Кот с изогнутыми ушами",
          "answer4": "Грета",
          "correctAnswer": "Печальный кот"
        },
        {
          "category": "Мемы",
          "score": 200,
          "question": "На что сел пацан из-за чего с него начали требовать касарь?",
          "answer1": "Пенек",
          "answer2": "Бутылка",
          "answer3": "Кровать",
          "answer4": "Телефон",
          "correctAnswer": "Пенек"
        },
        {
          "category": "Мемы",
          "score": 300,
          "question": "Какое слово идет после дирижабль ?",
          "answer1": "Прикинь",
          "answer2": "Ага",
          "answer3": "Смотри",
          "answer4": "Запили",
          "correctAnswer": "Ага"
        },
        {
          "category": "Мемы",
          "score": 400,
          "question": "Никто и никогда не вернется в ... год",
          "answer1": "2000",
          "answer2": "1993",
          "answer3": "2007",
          "answer4": "2010",
          "correctAnswer": "2007"
        },
        {
          "category": "Мемы",
          "score": 500,
          "question": "Продолжите фразу из мем-звонка: С какой стати, вы меня извините?! Я скандал такой ...",
          "answer1": "Закачу",
          "answer2": "Устрою",
          "answer3": "Учиню",
          "answer4": "Разгоню",
          "correctAnswer": "Учиню"
        },
      
        {
          "category": "КинМ",
          "score": 100,
          "question": "Как называется сериал, в котором главный герой является Уолтер Уайт?",
          "answer1": "Отбросы",
          "answer2": "Во все тяжкие",
          "answer3": "Бесстыжие",
          "answer4": "Пацаны",
          "correctAnswer": "Во все тяжкие"
        },
        {
          "category": "Кино",
          "score": 200,
          "question": "Какой фильм о супергероях Marvel имеет сцену, где персонажи взлетают в небо на куске земли?",
          "answer1": "Мстители: Эра Альтрона",
          "answer2": "Черная пантера",
          "answer3": "Тор: Рагнарёк",
          "answer4": "Капитан Америка: Зимний солдат",
          "correctAnswer": "Мстители: Эра Альтрона"
        },
        {
          "category": "Кино",
          "score": 300,
          "question": "Какой фильм снят Кристофером Ноланом, в котором герой путешествует через сны?",
          "answer1": "Темный рыцарь",
          "answer2": "Интерстеллар",
          "answer3": "Начало",
          "answer4": "Престиж",
          "correctAnswer": "Начало"
        },
        {
          "category": "Кино",
          "score": 400,
          "question": "Как называется фильм, в котором главный герой пытается спасти человечество от глобальной катастрофы, используя гигантскую волну?",
          "answer1": "2012",
          "answer2": "День после завтрашнего дня",
          "answer3": "Гравитация",
          "answer4": "Интерстеллар",
          "correctAnswer": "2012"
        },
        {
          "category": "Кино",
          "score": 500,
          "question": "Какой фильм из серии о Джеймсе Бонде был снят в 2006 году и стал перезагрузкой франшизы?",
          "answer1": "Казино Рояль",
          "answer2": "Не время умирать",
          "answer3": "Золотой глаз",
          "answer4": "Умри, но не сейчас",
          "correctAnswer": "Казино Рояль"
        },
      
        {
          "category": "Кулинария",
          "score": 100,
          "question": "Что называют белой смертью?",
          "answer1": "Сахар",
          "answer2": "Соль",
          "answer3": "Мука",
          "answer4": "Рис",
          "correctAnswer": "Соль"
        },
        {
          "category": "Кулинария",
          "score": 200,
          "question": "Какое самое дорогое мясо в мире?",
          "answer1": "Цыпленок Цемани",
          "answer2": "Говядина Вагю",
          "answer3": "филе миньон",
          "answer4": "Американский угорь",
          "correctAnswer": "Говядина Вагю"
        },
        {
          "category": "Кулинария",
          "score": 300,
          "question": "Какой вид пасты часто используется в запеканках и имеет форму трубочек?",
          "answer1": "Пенне",
          "answer2": "Спагетти",
          "answer3": "Фетучини",
          "answer4": "Лазанья",
          "correctAnswer": "Пенне"
        },
        {
          "category": "Кулинария",
          "score": 400,
          "question": "Какой самый острый перец в мире?",
          "answer1": "Pot Primo",
          "answer2": "Trinidad Moruga Scorpion",
          "answer3": "Chocolate Bhutlah",
          "answer4": "Carolina Reaper",
          "correctAnswer": "Carolina Reaper"
        },
        {
          "category": "Кулинария",
          "score": 500,
          "question": "Как называется традиционное итальянское блюдо, которое состоит из обжаренной курицы, обваленной в панировке и подается с соусом из лимона и каперсов?",
          "answer1": "Коттедж",
          "answer2": "Миланезе",
          "answer3": "Коттедж",
          "answer4": "Вителло Тоннато",
          "correctAnswer": "Миланезе"
        },
      
        {
          "category": "Даша",
          "score": 100,
          "question": "Какой любимы сериал Даши?",
          "answer1": "Счастливы вместе",
          "answer2": "Игра пристолов",
          "answer3": "Друзья",
          "answer4": "Отбросы",
          "correctAnswer": "Друзья"
        },
        {
          "category": "Даша",
          "score": 200,
          "question": "В каком кампусе она училась",
          "answer1": "Онлайн",
          "answer2": "Парт-тайм",
          "answer3": "Москва",
          "answer4": "Питер",
          "correctAnswer": "Москва"
        },
        {
          "category": "Даша",
          "score": 300,
          "question": "Любимы напиток Даши?",
          "answer1": "Чай",
          "answer2": "Кофе",
          "answer3": "Лимонад",
          "answer4": "Вино",
          "correctAnswer": "Кофе"
        },
        {
          "category": "Даша",
          "score": 400,
          "question": "В какой группе училась Даша?",
          "answer1": "Дельфины",
          "answer2": "Киты",
          "answer3": "Сойки",
          "answer4": "Бобры",
          "correctAnswer": "Сойки"
        },
        {
          "category": "Даша",
          "score": 500,
          "question": "Кто она по образованию?",
          "answer1": "Преподаватель",
          "answer2": "Программист",
          "answer3": "Юрист",
          "answer4": "Химик",
          "correctAnswer": "Химик"
        },
      
        {
          "category": "Медведи",
          "score": 100,
          "question": "У кого самые сильные soft скилы ?",
          "answer1": "Сергей Б",
          "answer2": "Олег",
          "answer3": "Иван",
          "answer4": "Сергей Ч",
          "correctAnswer": "Сергей Ч"
        },
        {
          "category": "Медведи",
          "score": 200,
          "question": "От кого пошел мем с дрелью ?",
          "answer1": "Вика",
          "answer2": "Вова",
          "answer3": "Паша",
          "answer4": "Макс",
          "correctAnswer": "Паша"
        },
        {
          "category": "Медведи",
          "score": 300,
          "question": "У кого самые классные новости ?",
          "answer1": "Макс",
          "answer2": "Света",
          "answer3": "Иван",
          "answer4": "Сергей Б",
          "correctAnswer": "Макс"
        },
        {
          "category": "Медведи",
          "score": 400,
          "question": "У кого чаще всего горит с заданий Эльбруса ?",
          "answer1": "Света",
          "answer2": "Сергей Ч",
          "answer3": "Олег",
          "answer4": "Вова",
          "correctAnswer": "Олег"
        },
        {
          "category": "Медведи",
          "score": 500,
          "question": "Кто из нас является актером а не настоящим учеником ?",
          "answer1": "Вика и Олег",
          "answer2": "Сергей Б и Паша",
          "answer3": "Иван и Вова",
          "answer4": "Все",
          "correctAnswer": "Все"
        }
      ],
      {},
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
