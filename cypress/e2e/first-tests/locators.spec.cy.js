/// <reference types="cypress" />

describe("Locators", ()=> {
  beforeEach(() => {
    cy.visit('http://localhost:3000/application/settings/site-settings')
  })

  it("locating elements with the get", () => {
    //get elements by tag
    cy.get("li")

    //get elements by class
    cy.get(".ant-menu-title-content")

    //get elements with a specific classes
    cy.get("[class='ant-btn ant-btn-primary ant-btn-lg ant-btn-block']")

    //get element by specific attribute
    cy.get("[type='submit']")

    //get all elements by tag name and class
    cy.get("button.ant-btn")

    //get elements by tag, class and type
    cy.get("button.ant-btn[type='submit']")

    //get all elements with specific data test id
    cy.get("[data-cy='btn-id-1']")

  })
})