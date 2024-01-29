import { Given } from "@badeball/cypress-cucumber-preprocessor";
const users = require("../../fixtures/users.json");
const boxPage = require("../../fixtures/pages/boxPage.json");
const drawPage = require("../../fixtures/pages/drawPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");
const inviteeBoxPage = require("../../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../../fixtures/pages/inviteeDashboardPage.json");
import { faker } from "@faker-js/faker";

let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
let maxAmount = 50;
let currency = "Евро";
let boxID = faker.random.alphaNumeric(5);

Given("the user is on the login page", function () {
  cy.visit("/login");
});

Given(
  "the user logs in as {string} and {string}",
  function (userName, password) {
    cy.login(userName, password);
  }
);

Given("the user creates a box", function () {
  cy.contains("Создать коробку").click();
  cy.get(boxPage.boxNameField).type(newBoxName);
  cy.get(boxPage.boxIdField).clear().type(boxID);
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(boxPage.sixthIcon).click();
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(boxPage.giftPriceToggle).check({ force: true });
  cy.get(boxPage.maxAnount).type(maxAmount);
  cy.get(boxPage.currency).select(currency);
  cy.get(generalElements.arrowRight).click();
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(generalElements.arrowRight).click({ force: true });
  cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
});

Given("the user is on the box page", function () {
  cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
    .invoke("text")
    .then((text) => {
      expect(text).to.include("Участники");
      expect(text).to.include("Моя карточка");
      expect(text).to.include("Подопечный");
    });
});

Given("the author adds the following users", function (dataTable) {
  cy.get(generalElements.submitButton).click();
  cy.addUsersToTheList(
    dataTable.hashes()[0].nameSelector,
    dataTable.hashes()[0].emailSelector,
    dataTable.hashes()[0].name,
    dataTable.hashes()[0].email
  );
  cy.addUsersToTheList(
    dataTable.hashes()[1].nameSelector,
    dataTable.hashes()[1].emailSelector,
    dataTable.hashes()[1].name,
    dataTable.hashes()[1].email
  );
  cy.addUsersToTheList(
    dataTable.hashes()[2].nameSelector,
    dataTable.hashes()[2].emailSelector,
    dataTable.hashes()[2].name,
    dataTable.hashes()[2].email
  );
  cy.get(inviteeBoxPage.inviteButton).click();
});

Given(
  "the participant's list includes three users as {string} and {string} and {string}",
  function (username1, username2, username3) {
    cy.get(inviteeBoxPage.inviteButton).click();
    cy.visit(`/box/${boxID}`);
    cy.get(".user-card__name")
      .invoke("text")
      .then((text) => {
        expect(text).to.include(username1);
        expect(text).to.include(username2);
        expect(text).to.include(username3);
      });
  }
);

Given("the author is on the box page", function () {
  cy.visit(`/box/${boxID}`);
});

Given("the author conducts the draw", function () {
  cy.get(drawPage.drawStartButton).click({ force: true });
  cy.get(generalElements.submitButton).click({ force: true });
  cy.get(drawPage.drawConfirmButton).click({ force: true });
  cy.get(drawPage.drawResultButton).click({ force: true });
});

Given("the draws's list displays", function () {
  cy.contains(
    "На этой странице показан актуальный список участников со всей информацией."
  );
  cy.clearCookies();
});

Given("users log in as {string} and {string}", function (email, password) {
  cy.login(email, password);
});

Given("the user approves the participation", function () {
  cy.approveParticipation(boxID, wishes);
});

Given("the notice for the participant displays", function () {
  cy.get(inviteeDashboardPage.noticeForInvitee)
    .invoke("text")
    .then((text) => {
      expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    });
  cy.clearCookies();
});

after("delete box", () => {
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
