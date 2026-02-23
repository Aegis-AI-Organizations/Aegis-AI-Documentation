import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Home | ${siteConfig.title}`}
      description="Documentation for Aegis AI Platform. Explore the architecture, APIs, and guidelines.">
      <main className="hero">
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px', zIndex: 10 }}>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            borderRadius: '20px',
            backgroundColor: 'rgba(0, 229, 255, 0.1)',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            color: '#00e5ff',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '2rem'
          }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#00e5ff',
              marginRight: '8px'
            }}></span>
            v2.0 is now live
          </div>

          <h1 className="hero__title">
            Autonomous <br />
            <span>Offensive Security</span> <br />
            Built for Production.
          </h1>

          <p className="hero__subtitle">
            Aegis continuously detects vulnerabilities, generates evidence, and produces remediation workflows — fast.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '3rem',
            flexWrap: 'wrap'
          }}>
            <Link
              className="button button--primary button--lg"
              to="/docs/Agent/architecture"
              style={{ minWidth: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Platform Documentation
            </Link>
            <Link
              className="button button--secondary button--outline button--lg"
              to="/docs/Swagger-API/aegis-ai-gateway-api"
              style={{ minWidth: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', borderColor: 'rgba(0, 229, 255, 0.4)', color: '#00e5ff' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
              Interactive API (Swagger)
            </Link>
          </div>
        </div>
      </main>

      <section style={{ backgroundColor: '#050810', padding: '5rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div className="row">
            <div className="col col--4" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem', backgroundColor: 'rgba(0,229,255,0.05)', borderRadius: '14px', border: '1px solid rgba(0,229,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00e5ff' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5Z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1rem' }}>Microservices Core</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Explore the Rust-based ingestion agent, Go control plane, and Temporal Python workflows securely orchestrated.</p>
            </div>
            <div className="col col--4" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem', backgroundColor: 'rgba(168,85,247,0.05)', borderRadius: '14px', border: '1px solid rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" /><path d="M10 22h10a2 2 0 0 0 2-2V12a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2v0Z" /></svg>
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1rem' }}>Native Swagger UI</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Full OpenAPI v3 integration. Test endpoints, generate client codes, and review API responses directly from the hub.</p>
            </div>
            <div className="col col--4" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ width: '60px', height: '60px', margin: '0 auto 1.5rem', backgroundColor: 'rgba(59,130,246,0.05)', borderRadius: '14px', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1rem' }}>Security Hardened</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Built for SOC analysts. Documentation for ephemeral isolated sandboxes deployed over Kubernetes & Cilium.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
