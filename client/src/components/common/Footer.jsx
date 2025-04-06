import { 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn 
} from 'react-icons/fa';
import { 
  MdEmail, 
  MdPhone 
} from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const styles = {
    footer: {
      backgroundColor: '#0f172a',
      color: '#e2e8f0',
      padding: '3rem 0 1rem',
      width: '100%',
      fontFamily: "'Inter', sans-serif",
      position: 'relative'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1.5rem',
      position: 'relative'
    },
    mainContent: {
      display: 'flex',
      justifyContent: 'space-between', // This pushes left and right sections to corners
      marginTop: '4rem',
      '@media (maxWidth: 768px)': {
        flexDirection: 'column',
        gap: '2rem',
        marginTop: '5rem'
      }
    },
    brandSection: {
      position: 'absolute',
      top: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '300px',
      textAlign: 'center',
      '@media (maxWidth: 768px)': {
        position: 'static',
        transform: 'none',
        margin: '0 auto 2rem'
      }
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem'
    },
    tagline: {
      fontSize: '0.9rem',
      lineHeight: '1.5',
      color: '#94a3b8',
      marginBottom: '1rem'
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      a: {
        color: '#94a3b8',
        fontSize: '1.1rem',
        transition: 'all 0.2s ease',
        ':hover': {
          color: '#38bdf8'
        }
      }
    },
    linksSection: {
      textAlign: 'left', // Force left alignment
      marginRight: 'auto' // Push to far left
    },
    contactSection: {
      textAlign: 'right', // Force right alignment
      marginLeft: 'auto' // Push to far right
    },
    sectionTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '1rem',
      position: 'relative',
      paddingBottom: '0.5rem',
      '::after': {
        content: '""',
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '40px',
        height: '2px',
        backgroundColor: '#38bdf8'
      }
    },
    linkList: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      a: {
        color: '#94a3b8',
        textDecoration: 'none',
        fontSize: '0.9rem',
        transition: 'color 0.2s ease',
        ':hover': {
          color: '#38bdf8',
          paddingLeft: '5px'
        }
      }
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      div: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end', // Keep contact items right-aligned
        gap: '0.5rem',
        color: '#94a3b8',
        fontSize: '0.9rem',
        '@media (maxWidth: 768px)': {
          justifyContent: 'flex-start'
        },
        svg: {
          color: '#38bdf8',
          fontSize: '1.1rem'
        }
      }
    },
    copyright: {
      borderTop: '1px solid #1e293b',
      paddingTop: '1.5rem',
      marginTop: '3rem',
      textAlign: 'center',
      color: '#64748b',
      fontSize: '0.85rem',
      '@media (maxWidth: 768px)': {
        marginTop: '2rem'
      }
    },
    legalLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1.5rem',
      marginBottom: '0.75rem',
      a: {
        color: '#64748b',
        textDecoration: 'none',
        fontSize: '0.85rem',
        transition: 'color 0.2s ease',
        ':hover': {
          color: '#38bdf8'
        }
      }
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Elevated Brand Section */}
        <div style={styles.brandSection}>
          <div style={styles.logo}>
            <span>Habi</span>
            <span style={{color: '#38bdf8'}}>Fy</span>
          </div>
          <p style={styles.tagline }>
            Share your progress with others.
          </p>
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialLinks.a}><FaTwitter /></a>
            <a href="#" style={styles.socialLinks.a}><FaFacebookF /></a>
            <a href="#" style={styles.socialLinks.a}><FaInstagram /></a>
            <a href="#" style={styles.socialLinks.a}><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Main Footer Content */}
        <div style={styles.mainContent}>
          {/* Quick Links Section - Far Left */}
          <div style={styles.linksSection}>
            <h4 style={styles.sectionTitle}>Quick Links</h4>
            <ul style={styles.linkList}>
              <li><Link to="/about" style={styles.linkList.a}>About</Link></li>
              <li><Link to="/features" style={styles.linkList.a}>Features</Link></li>
              <li><Link to="/community" style={styles.linkList.a}>Community</Link></li>
            </ul>
          </div>

          {/* Contact Section - Far Right */}
          <div style={styles.contactSection}>
            <h4 style={{...styles.sectionTitle, '::after': { left: 'auto', right: 0 }}}>
              Contact
            </h4>
            <div style={styles.contactInfo}>
              <div>
                <span>contact@example.com</span>
                <MdEmail />
              </div>
              <div>
                <span>+1 (234) 567-890</span>
                <MdPhone />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div style={styles.copyright}>
          <div style={styles.legalLinks}>
            <Link to="/privacy" style={styles.legalLinks.a}>Privacy</Link>
            <Link to="/terms" style={styles.legalLinks.a}>Terms</Link>
          </div>
          <p>© {currentYear} HabiFy</p>
        </div>
      </div>
    </footer>
  );
}