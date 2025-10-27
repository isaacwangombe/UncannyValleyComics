import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Spinner,
  Form,
  Row,
  Col,
  Badge,
  Collapse,
} from "react-bootstrap";
import { getUsers, toggleStaff, promoteToOwner, api } from "../../apiAdmin";

const UsersPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [visitorStats, setVisitorStats] = useState({ daily: 0, monthly: 0 });
  const [showCustomers, setShowCustomers] = useState(false);
  const [customerPage, setCustomerPage] = useState(1);
  const [customerResults, setCustomerResults] = useState([]);
  const [searchCustomers, setSearchCustomers] = useState([]); // ✅ new for search results
  const [customerHasMore, setCustomerHasMore] = useState(false);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const load = async () => {
    setLoading(true);
    const [userRes, visitorRes, currentRes] = await Promise.all([
      getUsers(),
      api.get("/admin/analytics/visitors/"),
      api.get("/auth/user/"),
    ]);

    setAllUsers(userRes);
    setVisitorStats(visitorRes.data);
    setCurrentUser(currentRes.data);
    setLoading(false);
  };

  const loadCustomers = async (page = 1) => {
    setLoadingCustomers(true);
    try {
      const res = await api.get("/admin/users/", { params: { page } });
      const customers = res.data.filter((u) => u.role === "Customer");
      setCustomerResults((prev) =>
        page === 1 ? customers : [...prev, ...customers]
      );
      setCustomerHasMore(customers.length >= 10);
      setCustomerPage(page);
    } catch (err) {
      console.error("Failed to load customers:", err);
    } finally {
      setLoadingCustomers(false);
    }
  };

  // 🔍 On search — also search customers from API
  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.trim().length === 0) {
      setSearchCustomers([]);
      return;
    }

    try {
      const res = await api.get("/admin/users/", {
        params: { search: query },
      });
      const customers = res.data.filter((u) => u.role === "Customer");
      setSearchCustomers(customers);
    } catch (err) {
      console.error("Failed to search customers:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggleStaff = async (id) => {
    await toggleStaff(id);
    load();
  };

  const handlePromoteOwner = async (id) => {
    try {
      await promoteToOwner(id);
      load();
    } catch (err) {
      console.error("❌ Owner promotion failed:", err);
    }
  };

  const groupByRole = (role) =>
    allUsers.filter(
      (u) =>
        u.role === role &&
        (u.username.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()))
    );

  const superadmins = groupByRole("Superadmin");
  const owners = groupByRole("Owner");
  const staff = groupByRole("Staff");

  const renderTable = (title, users, allowActions = true) => (
    <>
      <h5 className="mt-4">{title}</h5>
      {users.length > 0 ? (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              {allowActions && <th style={{ width: "200px" }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const canEdit =
                allowActions &&
                currentUser &&
                (currentUser.is_superuser || currentUser.role === "Owner") &&
                currentUser.pk !== u.pk; // cannot edit self

              return (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>{u.is_staff ? "✅ Staff" : "❌ User"}</td>
                  {allowActions && (
                    <td>
                      {canEdit && (
                        <Button
                          variant={u.is_staff ? "warning" : "success"}
                          size="sm"
                          className="me-2"
                          onClick={() => handleToggleStaff(u.id)}
                        >
                          {u.is_staff ? "Remove Staff" : "Make Staff"}
                        </Button>
                      )}
                      {currentUser?.is_superuser && currentUser.pk !== u.pk && (
                        <Button
                          variant={u.role === "Owner" ? "secondary" : "info"}
                          size="sm"
                          onClick={() => handlePromoteOwner(u.id)}
                        >
                          {u.role === "Owner" ? "Remove Owner" : "Make Owner"}
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <p className="text-muted">No {title.toLowerCase()} found.</p>
      )}
    </>
  );

  if (loading) return <Spinner animation="border" />;

  const showSuperadmins = currentUser && currentUser.is_superuser;

  return (
    <div className="p-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h3>Users</h3>
        </Col>
        <Col className="text-end">
          <Badge bg="primary" className="me-2">
            Daily Visitors: {visitorStats.daily}
          </Badge>
          <Badge bg="info">Monthly Visitors: {visitorStats.monthly}</Badge>
        </Col>
      </Row>

      {/* --- Search --- */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Search by username or email..."
            value={search}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>

      {/* --- Role Tables --- */}
      {showSuperadmins && renderTable("Superadmins", superadmins)}
      {renderTable("Owners", owners)}
      {renderTable("Staff", staff)}

      {/* --- Search Results for Customers --- */}
      {searchCustomers.length > 0 && (
        <>
          <h5 className="mt-4">Customer Search Results</h5>
          {renderTable("Search Matches", searchCustomers)}
        </>
      )}

      {/* --- Collapsible Customers --- */}
      <div className="mt-4">
        <Button
          variant="outline-primary"
          onClick={async () => {
            if (!showCustomers && customerResults.length === 0)
              await loadCustomers();
            setShowCustomers((prev) => !prev);
          }}
        >
          {showCustomers ? "Hide All Customers" : "Show All Customers"}
        </Button>

        <Collapse in={showCustomers}>
          <div>
            <h5 className="mt-3">All Customers</h5>
            {loadingCustomers ? (
              <Spinner animation="border" />
            ) : (
              <>
                {customerResults.length > 0 ? (
                  renderTable("Customers", customerResults)
                ) : (
                  <p className="text-muted">No customers found.</p>
                )}

                {customerHasMore && (
                  <div className="text-center mt-3">
                    <Button
                      onClick={() => loadCustomers(customerPage + 1)}
                      disabled={loadingCustomers}
                    >
                      {loadingCustomers ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default UsersPage;
