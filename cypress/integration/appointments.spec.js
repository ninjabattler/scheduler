describe("Appointment", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
  
    cy.visit("/");
  
    cy.contains("Monday");
   });

  it('should book an interview', () => {
    cy.get("[alt=Add]")
    .first()
    .click();

    cy.get("[data-testid=student-name-input]")
    .type('Lydia Miller-Jones');

    cy.get("[alt='Sylvia Palmer']")
    .first()
    .click();

    cy.contains('Save')
    .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  })

  it('should edit an interview', () => {
    cy.get(".appointment__card--show")
    .first()
    .trigger('mouseover');

    cy.get("[alt='Edit']")
    .click({force: true});

    cy.get("[data-testid=student-name-input]")
    .clear()
    .type('Lydia Miller-Jones 2.0');

    cy.get("[alt='Sylvia Palmer']")
    .last()
    .click();

    cy.contains('Save')
    .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones 2.0");

  })

  it('should cancel an interview', () => {
    cy.get(".appointment__card--show")
    .first()
    .trigger('mouseover');

    cy.get("[alt='Delete']")
    .click({force: true});

    cy.contains("Confirm")
    .click();

    cy.contains("DELETING a new thing...").should("exist");
    cy.contains("DELETING a new thing...").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");

  })

});