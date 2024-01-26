const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const drawPage = require("../fixtures/pages/drawPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
import { faker } from "@faker-js/faker";

describe("user can create a box and run it", () => {
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let maxAmount = 50;
  let currency = "Евро";
  let boxID = faker.random.alphaNumeric(5);
  let cookieHeader;

  it("user logins and create a box", () => {
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.get(boxPage.boxIdField).clear().type(boxID);
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.sixthIcon).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.giftPriceToggle).check({ force: true });
    cy.get(boxPage.maxAnount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
    cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Участники");
        expect(text).to.include("Моя карточка");
        expect(text).to.include("Подопечный");
      });
  });

  it("add participants", () => {
    cy.get(generalElements.submitButton).click();
    cy.addUsersToTheList(
      inviteeBoxPage.nameFirstField,
      inviteeBoxPage.emailFirstField,
      users.user1.name,
      users.user1.email
    );
    cy.addUsersToTheList(
      inviteeBoxPage.nameSecondField,
      inviteeBoxPage.emailSecondField,
      users.user2.name,
      users.user2.email
    );
    cy.addUsersToTheList(
      inviteeBoxPage.nameThirdField,
      inviteeBoxPage.emailThirdField,
      users.user3.name,
      users.user3.email
    );
    cy.get(inviteeBoxPage.inviteButton).click();
    cy.visit(`/box/${boxID}`);
    cy.get(".user-card__name")
      .invoke("text")
      .then((text) => {
        expect(text).to.include(users.user1.name);
        expect(text).to.include(users.user2.name);
        expect(text).to.include(users.user3.name);
      });
  });

  it("the draw verification", () => {
    cy.get(drawPage.drawStartButton).click({ force: true });
    cy.get(generalElements.submitButton).click();
    cy.get(drawPage.drawConfirmButton).click();
    cy.get(drawPage.drawResultButton).click();
    cy.contains(
      "На этой странице показан актуальный список участников со всей информацией."
    );
    cy.clearCookies();
  });

  it("approve as user1", () => {
    cy.login(users.user1.email, users.user1.password);
    cy.approveParticipation(boxID, wishes);
    cy.clearCookies();
  });

  it("approve as user2", () => {
    cy.login(users.user2.email, users.user2.password);
    cy.approveParticipation(boxID, wishes);
    cy.clearCookies();
  });

  it("approve as user3", () => {
    cy.login(users.user3.email, users.user3.password);
    cy.approveParticipation(boxID, wishes);
    cy.clearCookies();
  });

  it("delete box", () => {
    cy.request({
      method: "DELETE",
      headers: {
        Cookie:
          "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY1Mjc5ODAsImlhdCI6MTcwNjI5NjM3OSwiZXhwIjoxNzA4ODg4Mzc5fQ.HiMvKRvwArW-gi72B2f4qN7qaiFLQMpRYbAOyf-Lkbc; lang=ru; _ym_d=1706263488; _ym_isad=2; _ym_uid=1706263488766108846",
      },
      url: `https://santa-secret.ru/api/box/${boxID}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});

//   it("delete box", () => {
//     cy.login(users.userAutor.email, users.userAutor.password);
//     cy.getCookies().then((cookies) => {
//       cookieHeader = cookies
//         .map((cookie) => `${cookie.name}=${cookie.value}`)
//         .join("; ");
//     });
//     cy.request({
//       method: "DELETE",
//       headers: {
//         Cookie: cookieHeader,
//       },
//       url: `https://santa-secret.ru/api/box/${boxID}`,
//     }).then((response) => {
//       expect(response.status).to.equal(200);
//     });
//   });
// });
