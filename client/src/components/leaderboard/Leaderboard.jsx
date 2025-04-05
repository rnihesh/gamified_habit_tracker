import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommunityLeaderboard = () => {
  const [users, setUsers] = useState([]);
  const [blinking, setBlinking] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user-api/leaderboard');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const intervalId = setInterval(fetchLeaderboard, 30000);

    const blinkInterval = setInterval(() => {
      setBlinking(prev => !prev);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(blinkInterval);
    };
  }, []);

  const getRankColor = (index) => {
    switch(index) {
      case 0: return 'linear-gradient(135deg, #FFD700, #C9B037)';
      case 1: return 'linear-gradient(135deg, #C0C0C0, #A8A8A8)';
      case 2: return 'linear-gradient(135deg, #CD7F32, #B87333)';
      default: return '#f8f9fa';
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-2" style={{ 
        color: '#2c3e50',
        fontWeight: '700',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
        paddingBottom: '10px',
        borderBottom: '2px solid #e9ecef'
      }}>
        Leaderboard
      </h2>
      
      <div className="card shadow-sm border-0 overflow-hidden" style={{ borderRadius: '12px' }}>
        <table className="table mb-0">
          <thead style={{
            background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
            color: 'white'
          }}>
            <tr>
              <th style={{ width: '10%', padding: '1rem', fontWeight: '600', textAlign: 'center' }}>RANK</th>
              <th style={{ width: '50%', padding: '1rem', fontWeight: '600', textAlign: 'center' }}>USER</th>
              <th style={{ width: '40%', padding: '1rem', fontWeight: '600', textAlign: 'center' }}>SCORE</th>
            </tr>
          </thead>
          <tbody style={{ borderTop: 'none' }}>
            {users.map((user, index) => {
              const isTopThree = index < 3;

              return (
                <tr 
                  key={user._id} 
                  style={{
                    background: getRankColor(index),
                    transition: 'all 0.3s ease',
                    borderBottom: '1px solid rgba(0,0,0,0.05)'
                  }}
                  className={isTopThree ? 'top-three' : ''}
                >
                  {/* Rank */}
                  <td style={{
                    textAlign: 'center',
                    padding: '1rem',
                    fontWeight: 'bold',
                    fontSize: isTopThree ? '1.4rem' : '1.2rem',
                    color: '#000000',
                    verticalAlign: 'middle'
                  }}>
                    {index + 1}
                  </td>

                  {/* Profile + Name - Side by side and centered */}
                  <td style={{ padding: '1rem', verticalAlign: 'middle' }}>
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: isTopThree ? (blinking ? '3px solid gold' : '3px solid transparent') : '3px solid #e9ecef',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: 'all 0.5s ease'
                      }}>
                        <img
                          src={user.profileImageUrl || '/default-profile.png'}
                          alt="Profile"
                          width="100%"
                          height="100%"
                          style={{ 
                            objectFit: 'cover',
                            filter: isTopThree && blinking ? 'brightness(1.2)' : 'none',
                            transition: 'all 0.5s ease'
                          }}
                          onError={(e) => {
                            e.target.src = '/default-profile.png';
                          }}
                        />
                      </div>
                      <div>
                        <span style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: '#000000'
                        }}>
                          {user.firstName}
                        </span>
                        {isTopThree && (
                          <div style={{
                            fontSize: '0.8rem',
                            color: '#000000',
                            fontWeight: '500',
                            opacity: 0.8
                          }}>
                            {index === 0 ? '🏆 Champion' : index === 1 ? '🥈 Runner-up' : '🥉 Third Place'}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Score Column — only total score shown */}
                  <td style={{ padding: '1rem', verticalAlign: 'middle' }}>
                    <div style={{ 
                      fontSize: '1.4rem',
                      fontWeight: '700',
                      color: '#000000',
                      textAlign: 'center'
                    }}>
                      {user.totalScore || user.score} {/* Use totalScore if available, otherwise fall back to score */}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .top-three {
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        tr:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        }
        thead {
          border-radius: 12px 12px 0 0;
        }
      `}</style>
    </div>
  );
};

export default CommunityLeaderboard;