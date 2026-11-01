import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, LogOut, ArrowLeft, Search, Filter, Phone, Mail, Trash2, 
  Eye, CheckCircle2, AlertTriangle, Clock, RefreshCw, X, User, MapPin, 
  FileText, Calendar, ExternalLink, AlertCircle
} from 'lucide-react';
import { DEMO_ADMIN, SERVICES_LIST, ENQUIRY_STATUSES, COMPANY_INFO } from '../data/constants';
import { 
  getStoredEnquiries, 
  updateEnquiryStatus, 
  deleteEnquiry, 
  getAdminSession, 
  setAdminSession 
} from '../utils/storage';
import Logo from '../components/Logo';

export default function AdminPage({ onNavigate }) {
  // Demo Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(getAdminSession());
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard Data State
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [serviceFilter, setServiceFilter] = useState('ALL');

  // Modals & Action State
  const [viewingEnquiry, setViewingEnquiry] = useState(null);
  const [deletingEnquiry, setDeletingEnquiry] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadEnquiries();
    }
  }, [isAuthenticated]);

  const loadEnquiries = () => {
    setIsLoading(true);
    const data = getStoredEnquiries();
    setEnquiries(data);
    setIsLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (usernameInput.trim() === DEMO_ADMIN.username && passwordInput === DEMO_ADMIN.password) {
      setAdminSession(true);
      setIsAuthenticated(true);
    } else {
      setLoginError('Invalid credentials. Use demo username: rahul & password: rahul@123');
    }
  };

  const handleLogout = () => {
    setAdminSession(false);
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = updateEnquiryStatus(id, newStatus);
    setEnquiries(updated);
    if (viewingEnquiry && viewingEnquiry.id === id) {
      setViewingEnquiry(prev => ({ ...prev, status: newStatus }));
    }
    showNotification(`Status updated to "${newStatus}"`);
  };

  const confirmDelete = () => {
    if (!deletingEnquiry) return;
    const updated = deleteEnquiry(deletingEnquiry.id);
    setEnquiries(updated);
    setDeletingEnquiry(null);
    if (viewingEnquiry && viewingEnquiry.id === deletingEnquiry.id) {
      setViewingEnquiry(null);
    }
    showNotification('Enquiry deleted from local storage.');
  };

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(item => {
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch = !query || (
        (item.fullName && item.fullName.toLowerCase().includes(query)) ||
        (item.phone && item.phone.toLowerCase().includes(query)) ||
        (item.email && item.email.toLowerCase().includes(query)) ||
        (item.id && item.id.toLowerCase().includes(query)) ||
        (item.message && item.message.toLowerCase().includes(query))
      );

      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
      const matchesService = serviceFilter === 'ALL' || item.serviceRequired === serviceFilter;

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [enquiries, searchTerm, statusFilter, serviceFilter]);

  const stats = useMemo(() => {
    return {
      total: enquiries.length,
      newCount: enquiries.filter(e => e.status === 'New').length,
      contacted: enquiries.filter(e => e.status === 'Contacted').length,
      inProgress: enquiries.filter(e => e.status === 'In Progress').length,
      resolved: enquiries.filter(e => e.status === 'Resolved').length
    };
  }, [enquiries]);

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Logo size="large" />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.35rem', color: '#FFFFFF' }}>
              Staff Dispatch Portal
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '0.88rem' }}>
              Internal Lead & Enquiry Dashboard
            </p>
          </div>

          <div className="demo-credentials-box">
            <div style={{ fontWeight: 700, color: '#FCD34D', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertCircle size={15} /> Demo Access Credentials
            </div>
            <div>Username: <code>rahul</code></div>
            <div style={{ marginTop: '0.2rem' }}>Password: <code>rahul@123</code></div>
          </div>

          {loginError && (
            <div className="form-notice-box" style={{ background: 'rgba(239, 68, 68, 0.12)', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#FCA5A5', marginTop: 0, marginBottom: '1.25rem' }}>
              <AlertTriangle size={18} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: '1.1rem' }}>
              <label className="form-label" htmlFor="admin-username">Username</label>
              <input
                id="admin-username"
                type="text"
                className="form-input"
                placeholder="Enter username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                className="form-input"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Sign In to Admin Portal
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onNavigate('/')}
              style={{ width: '100%' }}
            >
              <ArrowLeft size={14} />
              <span>Return to Public Website</span>
            </button>
          </div>

          <div className="admin-disclaimer-note">
            <strong>Demonstration Notice:</strong> This is a client-side frontend demo authentication for previewing enquiries stored in this browser&apos;s <code>localStorage</code>. It is not an enterprise backend or encrypted server authentication, and credentials can be viewed in frontend source code.
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <div className="admin-page-wrapper">
      <header className="admin-navbar">
        <div className="admin-nav-left">
          <button 
            type="button" 
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate('/')}
            title="Back to Landing Page"
          >
            <ArrowLeft size={15} />
            <span>View Public Site</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Logo size="small" showTagline={false} />
            <span className="admin-badge">Dispatch Dashboard</span>
          </div>
        </div>

        <div className="admin-nav-right">
          <span style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <User size={14} /> Signed in as <strong>{DEMO_ADMIN.username}</strong>
          </span>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleLogout}
            title="Log out from current session"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <main className="admin-main">
        {notification && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#1F2937',
            border: '1px solid #F59E0B',
            color: '#F8FAFC',
            padding: '0.85rem 1.25rem',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            zIndex: 3000,
            animation: 'fadeIn 0.2s ease'
          }}>
            <CheckCircle2 size={18} color="#F59E0B" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{notification}</span>
          </div>
        )}

        <div className="admin-header-row">
          <div>
            <h1 className="admin-page-title">{COMPANY_INFO.name} Haulage Enquiries & Leads</h1>
            <p style={{ color: '#94A3B8', fontSize: '0.92rem', marginTop: '0.2rem' }}>
              Real-time submission pipeline stored in this browser&apos;s local storage.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={loadEnquiries}
            disabled={isLoading}
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            <span>Refresh Data</span>
          </button>
        </div>

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div>
              <div className="admin-stat-count" style={{ color: '#F8FAFC' }}>{stats.total}</div>
              <div className="admin-stat-label">Total Enquiries</div>
            </div>
            <FileText size={28} color="#64748B" />
          </div>

          <div className="admin-stat-card" style={{ borderLeft: '4px solid #3B82F6' }}>
            <div>
              <div className="admin-stat-count" style={{ color: '#3B82F6' }}>{stats.newCount}</div>
              <div className="admin-stat-label">New Enquiries</div>
            </div>
            <Clock size={28} color="#3B82F6" />
          </div>

          <div className="admin-stat-card" style={{ borderLeft: '4px solid #F59E0B' }}>
            <div>
              <div className="admin-stat-count" style={{ color: '#F59E0B' }}>{stats.contacted}</div>
              <div className="admin-stat-label">Contacted</div>
            </div>
            <Phone size={28} color="#F59E0B" />
          </div>

          <div className="admin-stat-card" style={{ borderLeft: '4px solid #10B981' }}>
            <div>
              <div className="admin-stat-count" style={{ color: '#10B981' }}>{stats.resolved}</div>
              <div className="admin-stat-label">Resolved</div>
            </div>
            <CheckCircle2 size={28} color="#10B981" />
          </div>
        </div>

        <div className="admin-toolbar">
          <div className="admin-search-box">
            <Search size={16} className="admin-search-icon" />
            <input
              type="text"
              className="admin-search-input"
              placeholder="Search by customer name, phone, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="admin-filters-row">
            <select
              className="admin-filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by Status"
            >
              <option value="ALL">All Statuses ({stats.total})</option>
              {ENQUIRY_STATUSES.map(st => (
                <option key={st.value} value={st.value}>{st.label}</option>
              ))}
            </select>

            <select
              className="admin-filter-select"
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              aria-label="Filter by Service"
            >
              <option value="ALL">All Services</option>
              {SERVICES_LIST.map(srv => (
                <option key={srv.id} value={srv.title}>{srv.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="admin-table-container">
          {filteredEnquiries.length === 0 ? (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">
                <FileText size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F8FAFC' }}>
                {enquiries.length === 0 ? "No Enquiries In Local Storage Yet" : "No Enquiries Match Your Filters"}
              </h3>
              <p style={{ color: '#94A3B8', maxWidth: '480px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {enquiries.length === 0 
                  ? "When customers submit quote requests from the public Contact form, they will be saved to browser localStorage and displayed here automatically."
                  : "Try clearing your search query or setting the status and service filters back to 'All'."}
              </p>
              {enquiries.length === 0 && (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => onNavigate('/')}
                  style={{ marginTop: '0.5rem' }}
                >
                  Go to Public Contact Form
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop & Tablet Table View */}
              <div className="table-responsive admin-desktop-table-view">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Ref ID</th>
                      <th>Customer Details</th>
                      <th>Service Required</th>
                      <th>Project Location</th>
                      <th>Submitted</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnquiries.map((enq) => {
                      const statusObj = ENQUIRY_STATUSES.find(s => s.value === enq.status) || ENQUIRY_STATUSES[0];
                      const formattedDate = new Date(enq.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      });

                      return (
                        <tr key={enq.id}>
                          <td>
                            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#CBD5E1', fontSize: '0.82rem' }}>
                              {enq.id}
                            </span>
                          </td>
                          <td>
                            <div className="table-customer-name">{enq.fullName}</div>
                            <div className="table-customer-contact">
                              <span>{enq.phone}</span>
                              {enq.email && <span> • {enq.email}</span>}
                            </div>
                          </td>
                          <td>
                            <span style={{ color: '#E2E8F0', fontWeight: 500 }}>
                              {enq.serviceRequired}
                            </span>
                          </td>
                          <td>
                            <span style={{ color: '#94A3B8' }}>
                              {enq.projectLocation || '—'}
                            </span>
                          </td>
                          <td>
                            <span style={{ color: '#94A3B8', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                              {formattedDate}
                            </span>
                          </td>
                          <td>
                            <select
                              value={enq.status}
                              onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                              style={{
                                background: statusObj.bg,
                                color: statusObj.color,
                                borderColor: statusObj.border,
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderRadius: '9999px',
                                padding: '0.25rem 0.6rem',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                outline: 'none'
                              }}
                            >
                              {ENQUIRY_STATUSES.map(st => (
                                <option key={st.value} value={st.value} style={{ background: '#111419', color: '#FFFFFF' }}>
                                  {st.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <div className="table-actions-cell">
                              <button
                                type="button"
                                className="action-btn"
                                title="View full enquiry details"
                                onClick={() => setViewingEnquiry(enq)}
                              >
                                <Eye size={15} />
                              </button>

                              {enq.phone && (
                                <a
                                  href={`tel:${enq.phone}`}
                                  className="action-btn action-btn-call"
                                  title={`Call customer ${enq.phone}`}
                                >
                                  <Phone size={14} />
                                </a>
                              )}

                              {enq.email && (
                                <a
                                  href={`mailto:${enq.email}?subject=Regarding your JSVR Haulage Enquiry ${enq.id}`}
                                  className="action-btn action-btn-email"
                                  title={`Email customer ${enq.email}`}
                                >
                                  <Mail size={14} />
                                </a>
                              )}

                              <button
                                type="button"
                                className="action-btn action-btn-delete"
                                title="Delete enquiry"
                                onClick={() => setDeletingEnquiry(enq)}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List View (Rendered specifically on Mobile Viewports) */}
              <div className="admin-mobile-cards-view">
                {filteredEnquiries.map((enq) => {
                  const statusObj = ENQUIRY_STATUSES.find(s => s.value === enq.status) || ENQUIRY_STATUSES[0];
                  const formattedDate = new Date(enq.createdAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });

                  return (
                    <div key={enq.id} className="admin-mobile-card">
                      <div className="admin-mobile-card-top">
                        <div className="admin-mobile-card-header-info">
                          <span className="admin-mobile-card-id">{enq.id}</span>
                          <h4 className="admin-mobile-card-name">{enq.fullName}</h4>
                        </div>
                        <select
                          value={enq.status}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                          className="admin-mobile-card-status"
                          style={{
                            background: statusObj.bg,
                            color: statusObj.color,
                            borderColor: statusObj.border
                          }}
                        >
                          {ENQUIRY_STATUSES.map(st => (
                            <option key={st.value} value={st.value} style={{ background: '#111419', color: '#FFFFFF' }}>
                              {st.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="admin-mobile-card-body">
                        <div className="admin-mobile-info-item">
                          <span className="admin-mobile-info-label">Service</span>
                          <span className="admin-mobile-info-value highlight">{enq.serviceRequired}</span>
                        </div>
                        {enq.projectLocation && (
                          <div className="admin-mobile-info-item">
                            <span className="admin-mobile-info-label">Location</span>
                            <span className="admin-mobile-info-value">{enq.projectLocation}</span>
                          </div>
                        )}
                        <div className="admin-mobile-info-item">
                          <span className="admin-mobile-info-label">Submitted</span>
                          <span className="admin-mobile-info-value">{formattedDate}</span>
                        </div>
                      </div>

                      <div className="admin-mobile-card-actions">
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ flex: 1, minHeight: '40px', justifyContent: 'center' }}
                          onClick={() => setViewingEnquiry(enq)}
                        >
                          <Eye size={14} />
                          <span>Details</span>
                        </button>
                        {enq.phone && (
                          <a
                            href={`tel:${enq.phone}`}
                            className="btn btn-sm action-btn-call"
                            style={{ flex: 1, minHeight: '40px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', borderRadius: 'var(--radius-sm)' }}
                          >
                            <Phone size={14} />
                            <span>Call</span>
                          </a>
                        )}
                        {enq.email && (
                          <a
                            href={`mailto:${enq.email}?subject=Regarding your JSVR Haulage Enquiry ${enq.id}`}
                            className="btn btn-sm action-btn-email"
                            style={{ flex: 1, minHeight: '40px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', borderRadius: 'var(--radius-sm)' }}
                          >
                            <Mail size={14} />
                            <span>Email</span>
                          </a>
                        )}
                        <button
                          type="button"
                          className="action-btn action-btn-delete"
                          style={{ minHeight: '40px', minWidth: '40px' }}
                          title="Delete enquiry"
                          onClick={() => setDeletingEnquiry(enq)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div style={{
          marginTop: '2.5rem',
          padding: '1.25rem',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '8px',
          fontSize: '0.8rem',
          color: '#94A3B8',
          lineHeight: '1.6'
        }}>
          <strong style={{ color: '#E2E8F0', display: 'block', marginBottom: '0.25rem' }}>
            Local Storage Data Policy & Notice:
          </strong>
          All records shown above are stored locally under key <code>construction_enquiries</code> in this browser tab. This storage is isolated to this specific browser installation, does not synchronize across separate devices, will be cleared if browser website data is emptied, and does not replace a permanent production database.
        </div>
      </main>

      {/* MODAL: VIEW DETAILS */}
      {viewingEnquiry && (
        <div className="modal-backdrop" onClick={() => setViewingEnquiry(null)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span style={{ fontSize: '0.78rem', color: '#F59E0B', fontWeight: 700, fontFamily: 'monospace' }}>
                  {viewingEnquiry.id}
                </span>
                <h3 className="modal-title" style={{ marginTop: '0.2rem' }}>
                  Enquiry Details
                </h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setViewingEnquiry(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="admin-modal-grid">
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Customer Name</span>
                  <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1rem', marginTop: '0.15rem' }}>
                    {viewingEnquiry.fullName}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Status</span>
                  <div style={{ marginTop: '0.2rem' }}>
                    <select
                      value={viewingEnquiry.status}
                      onChange={(e) => handleStatusChange(viewingEnquiry.id, e.target.value)}
                      style={{
                        background: '#181D24',
                        color: '#FFFFFF',
                        border: '1px solid #F59E0B',
                        borderRadius: '6px',
                        padding: '0.25rem 0.5rem',
                        fontSize: '0.82rem',
                        fontWeight: 600
                      }}
                    >
                      {ENQUIRY_STATUSES.map(st => (
                        <option key={st.value} value={st.value}>{st.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Customer Phone</span>
                  <div style={{ color: '#FFFFFF', marginTop: '0.15rem' }}>
                    <a href={`tel:${viewingEnquiry.phone}`} style={{ color: '#34D399', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Phone size={13} /> {viewingEnquiry.phone}
                    </a>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Customer Email</span>
                  <div style={{ color: '#FFFFFF', marginTop: '0.15rem' }}>
                    {viewingEnquiry.email ? (
                      <a href={`mailto:${viewingEnquiry.email}`} style={{ color: '#60A5FA', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Mail size={13} /> {viewingEnquiry.email}
                      </a>
                    ) : (
                      <span style={{ color: '#64748B' }}>Not provided</span>
                    )}
                  </div>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Requested Service</span>
                  <div style={{ color: '#FCD34D', fontWeight: 600, marginTop: '0.15rem' }}>
                    {viewingEnquiry.serviceRequired}
                  </div>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700 }}>Project / Delivery Location</span>
                  <div style={{ color: '#CBD5E1', marginTop: '0.15rem' }}>
                    {viewingEnquiry.projectLocation || 'No specific location provided'}
                  </div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                  Customer Requirements & Message
                </span>
                <div style={{
                  background: '#0B0D10',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  padding: '1rem',
                  fontSize: '0.92rem',
                  color: '#E2E8F0',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap'
                }}>
                  {viewingEnquiry.message}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setViewingEnquiry(null)}
              >
                Close
              </button>

              {viewingEnquiry.phone && (
                <a
                  href={`tel:${viewingEnquiry.phone}`}
                  className="btn btn-primary btn-sm"
                >
                  <Phone size={14} /> Call Customer
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE CONFIRMATION */}
      {deletingEnquiry && (
        <div className="modal-backdrop" onClick={() => setDeletingEnquiry(null)}>
          <div className="modal-content-card" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#EF4444' }}>
                <AlertTriangle size={20} />
                Confirm Deletion
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setDeletingEnquiry(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <p style={{ color: '#CBD5E1', fontSize: '0.92rem', lineHeight: '1.5' }}>
                Are you sure you want to permanently delete enquiry <strong style={{ color: '#FFFFFF' }}>{deletingEnquiry.id}</strong> submitted by <strong style={{ color: '#FFFFFF' }}>{deletingEnquiry.fullName}</strong>?
              </p>
              <p style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '0.75rem' }}>
                This record will be permanently removed from your browser&apos;s local storage. This action cannot be undone.
              </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setDeletingEnquiry(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={confirmDelete}
              >
                <Trash2 size={14} /> Delete Enquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
