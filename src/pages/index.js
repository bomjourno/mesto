import "./index.css";
import {
  popupEditProfile,
  popupAddCard,
  userName,
  nameInput,
  jobInput,
  userInfo,
  btnEditProfile,
  btnAddCard,
  elementsContainer,
  initialCards,
  validationSelectors,
  btnDeleteCard,
  btnEditAvatar,
  popupProfileAvatar,
  btnPopupSubmit,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "db8791fd-f46d-4615-b308-f5256d937c0b",
    "Content-Type": "application/json",
  },
});

const user = new UserInfo({ userName, userInfo });
const openFullScreen = new PopupWithImage(".popup_fullscreen-card");

const popupWithConfirmation = new PopupWithConfirmation(
  ".popup_delete-card",
  function submitForm(card) {
    btnDeleteCard.textContent = "Удаление...";
    api
      .deleteCard(card._idCard)
      .then(() => card.delete())
      .then(() => popupWithConfirmation.close())
      .catch((err) => `Не удалось удалить карточку: ${err.status}`)
      .finally(() => {
        btnDeleteCard.textContent = "Карта удалена";
      });
  }
);

const cardsList = new Section(
  {
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    },
  },
  elementsContainer
);

const userProfilePopup = new PopupWithForm(
  ".popup_edit-profile",
  function submitForm(data) {
    btnLoading(popupEditProfile, btnPopupSubmit, true);
    api
      .patchUserData(data)
      .then((res) => {
        user.setUserInfo({
          name: res.name,
          position: res.about,
          id: res._id,
          avatar: res.avatar,
        });
      })
      .then(() => userProfilePopup.close())
      .catch((err) => `Не удалось удалить карточку: ${err.status}`)
      .finally(() => {
        btnLoading(popupEditProfile, btnPopupSubmit, false);
      });
  }
);

const popupChangeAvatar = new PopupWithForm(
  ".popup_change-avatar",
  function submitForm(data) {
    btnLoading(popupProfileAvatar, btnPopupSubmit, true);
    api
      .changeAvatar(data)
      .then((res) => {
        user.setUserInfo({
          name: res.name,
          position: res.about,
          id: res._id,
          avatar: res.avatar,
        });
      })
      .then(() => popupChangeAvatar.close())
      .catch((err) => err.status)
      .finally(() => {
        btnLoading(popupProfileAvatar, btnPopupSubmit, false);
      });
  }
);

const addCardPopup = new PopupWithForm(".popup_add-card", (data) => {
  addNewPost(data);
});

// Подгружаем данные пользователя с сервера
api
  .getUserData()
  .then((res) => {
    user.setUserInfo({
      name: res.name,
      position: res.about,
      id: res._id,
      avatar: res.avatar,
    });
  })
  .then(() => getStartCard())
  .catch((err) =>
    console.log(`Невозможно получить данные пользователя: ${err.status}`)
  );

// Включаем валидацию форм
const profileFormValidator = new FormValidator(
  validationSelectors,
  popupEditProfile
);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  validationSelectors,
  popupAddCard
);
addCardFormValidator.enableValidation();

const editProfileAvatar = new FormValidator(
  validationSelectors,
  popupProfileAvatar
);
editProfileAvatar.enableValidation();

const getStartCard = () => {
  api
    .getInitialCards()
    .then((data) => {
      console.log("Карточки загружены с сервера");
      const startCardArr = data.map((item) => {
        return {
          name: item.name,
          link: item.link,
          likes: item.likes,
          _id: item._id,
          owner: item.owner._id,
          createdDate: item.createdAt,
        };
      });
      const startCardArrSorted = startCardArr.sort((a, b) => {
        return new Date(a.createdDate) - new Date(b.createdDate);
      });
      cardsList.renderItems(startCardArrSorted);
    })
    .catch((err) => {
      console.log(
        `Не удалось загрузить данные с сервера, ошибка: ${err.status}`
      );
      cardsList.renderItems(initialCards);
    });
};

// ---------------------------------
function createCard(cardData) {
  const card = new Card(
    cardData,
    ".template",
    function handleFullScreen() {
      openFullScreen.open(cardData);
    },
    function handleDeleteCard(card) {
      popupWithConfirmation.open(card, btnDeleteCard);
    },
    function handleLike(dataCard) {
      likeCard(dataCard);
    },
    user.getUserId()
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const addNewPost = (data) => {
  btnLoading(popupAddCard, btnPopupSubmit, true);
  api
    .addNewCard(data)
    .then((res) => {
      return createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        _id: res._id,
        owner: res.owner._id,
      });
    })
    .then((data) => {
      cardsList.addItem(data);
    })
    .then(() => addCardPopup.close())
    .catch((err) => console.log(`Не удалось добавить карточку: ${err.status}`))
    .finally(() => {
      btnLoading(popupAddCard, btnPopupSubmit, false);
    });
};

const likeCard = (card) => {
  if (card.isLiked()) {
    api
      .unlikeCard(card._idCard)
      .then((res) => {
        card.setLike(res.likes);
        card.toggleLike();
      })
      .catch((err) => console.log(err.status));
  } else {
    api
      .likeCard(card._idCard)
      .then((res) => {
        card.setLike(res.likes);
        card.toggleLike();
      })
      .catch((err) => console.log(err.status));
  }
};

const btnLoading = (popupSelector, button, loading) => {
  const btnState = popupSelector.querySelector(button);
  if (loading) {
    return (btnState.textContent = "Сохранение...");
  }
  return (btnState.textContent = "Сохранить");
};

btnEditAvatar.addEventListener("click", () => {
  popupChangeAvatar.open();
  editProfileAvatar.toggleButtonState();
});

btnEditProfile.addEventListener("click", () => {
  const { name, position } = user.getUserInfo();
  nameInput.value = name;
  jobInput.value = position;
  userProfilePopup.open();
});

btnAddCard.addEventListener("click", () => {
  addCardFormValidator.toggleButtonState();
  addCardPopup.open();
});
