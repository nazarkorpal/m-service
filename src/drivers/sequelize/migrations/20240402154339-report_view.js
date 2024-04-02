"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
    CREATE VIEW reports_view AS
      SELECT *, r.total_price - r.total_cost as profit, ROUND(CAST(((r.total_price - r.total_cost) / r.total_cost) * 100 AS numeric), 2) AS profitability
	  FROM (
      SELECT o.date, sum(op.quantity * op.price) as total_price, sum(op.quantity * costs.value) as total_cost
      FROM orders o
      JOIN order_products op ON o.id = op.document_id
      JOIN costs ON costs.id = op.product_id 
        AND DATE_TRUNC('MONTH', costs.date) = DATE_TRUNC('MONTH', o.date)
      GROUP BY o.date
    ) r
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query("DROP VIEW IF EXISTS reports_view;");
  },
};
