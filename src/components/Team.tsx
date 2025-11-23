import React from 'react';
import teamData from '../data/team.json';

const Team: React.FC = () => {
    return (
        <section id="team" className="section bg-surface">
            <div className="container">
                <h2 className="section-title text-center mb-lg">Meet The Team</h2>
                <div className="team-grid">
                    {teamData.map((member) => (
                        <div key={member.id} className="team-card">
                            <div className="team-image">
                                <img src={member.image} alt={member.name} />
                            </div>
                            <div className="team-info">
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        .bg-surface {
          background-color: var(--color-surface);
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        .team-card {
          text-align: center;
          transition: transform 0.3s ease;
        }
        .team-card:hover {
          transform: translateY(-5px);
        }
        .team-image {
          width: 150px;
          height: 150px;
          margin: 0 auto 1.5rem;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--color-primary);
          padding: 3px;
          background: var(--color-bg);
        }
        .team-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
        .team-info h3 {
          font-size: 1.2rem;
          margin-bottom: 0.25rem;
        }
        .team-info p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>
        </section>
    );
};

export default Team;
