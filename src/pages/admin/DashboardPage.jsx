import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import {
  getDashboardStats,
  getMonthlySales,
  getSalesOverTime,
  getTopProducts,
} from "../../apiAdmin";
import Sidebar from "../../Components/admin/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "./admin.css";

const COLORS = ["#0d6efd", "#6f42c1", "#198754", "#dc3545", "#fd7e14"];

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [monthlySales, setMonthlySales] = useState([]);
  const [salesOverTime, setSalesOverTime] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [s, m, t, p] = await Promise.all([
          getDashboardStats(),
          getMonthlySales(),
          getSalesOverTime(),
          getTopProducts(),
        ]);
        setStats(s);
        setMonthlySales(m);
        setSalesOverTime(t);
        setTopProducts(p);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner animation="border" /> Loading dashboard...
      </div>
    );

  return (
    <div className="d-flex">
      {/* Dashboard Main Content */}
      <Container fluid className="p-4" style={{ backgroundColor: "#fff" }}>
        <h3 className="fw-bold mb-4">Dashboard Overview</h3>

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className="shadow-sm text-center border-0">
              <Card.Body>
                <h6 className="text-muted mb-1">Total Sales</h6>
                <h4>${stats?.total_sales?.toFixed(2)}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm text-center border-0">
              <Card.Body>
                <h6 className="text-muted mb-1">Total Orders</h6>
                <h4>{stats?.total_orders}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm text-center border-0">
              <Card.Body>
                <h6 className="text-muted mb-1">Total Users</h6>
                <h4>{stats?.total_users}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm text-center border-0">
              <Card.Body>
                <h6 className="text-muted mb-1">Top Product</h6>
                <h5 className="text-truncate">{stats?.top_product?.title}</h5>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row>
          <Col md={8}>
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body>
                <h6 className="fw-bold mb-3">Sales Over Time (Cumulative)</h6>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="cumulative_total"
                      // stroke="#0d6efd"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body>
                <h6 className="fw-bold mb-3">Top Products</h6>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={topProducts}
                      dataKey="sales_count"
                      nameKey="title"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {topProducts.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h6 className="fw-bold mb-3">Monthly Sales</h6>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlySales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#6f42c1" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardPage;
