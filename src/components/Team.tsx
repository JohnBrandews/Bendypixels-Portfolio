import React from 'react';
import teamData from '../data/team.json';

const total = teamData.length;

const Team: React.FC = () => {
  return (
    <section id="team" className="section bg-surface" data-aos="fade-up">
      <div className="container">
        <h2 className="section-title text-center mb-lg" data-aos="fade-up" data-aos-delay="100">
          Meet The Team
        </h2>
        <div className="team-bend-wrap" data-aos="fade-up" data-aos-delay="150">
          <div className="team-bend-row">
            {teamData.map((member, i) => {
              const t = total > 1 ? i / (total - 1) : 0.5;
              const bend = 24;
              const y = 4 * (t - 0.5) * (t - 0.5) - 1;
              const translateY = -y * bend;
              const rotateZ = (t - 0.5) * 6;
              return (
                <div
                  key={member.id}
                  className="team-card team-card-bend"
                  style={{
                    transform: `translateY(${translateY}px) rotate(${rotateZ}deg)`,
                  }}
                >
                  <div className="team-image-wrap">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="team-info">
                    <h3 className="team-name">{member.name}</h3>
                    <p className="team-role">{member.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        .bg-surface {
          background-color: var(--color-surface);
        }
        .team-bend-wrap {
          overflow: visible;
          padding: 1rem 0 3rem;
        }
        .team-bend-row {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 1.5rem;
          flex-wrap: wrap;
          max-width: 1100px;
          margin: 0 auto;
        }
        .team-card-bend {
          flex: 0 0 auto;
          width: clamp(180px, 22vw, 240px);
          text-align: center;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .team-card-bend:hover {
          transform: translateY(-12px) scale(1.02) !important;
          box-shadow: 0 20px 40px var(--color-shadow), 0 0 0 2px var(--color-cyan);
        }
        .team-image-wrap {
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 2px solid var(--color-border);
          margin-bottom: 1rem;
          background: var(--color-bg);
        }
        .team-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .team-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--color-text);
        }
        .team-role {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 500;
        }
        @media (max-width: 900px) {
          .team-bend-row {
            gap: 1.25rem;
          }
          .team-card-bend {
            width: clamp(160px, 40vw, 220px);
          }
        }
        @media (max-width: 500px) {
          .team-bend-row {
            flex-direction: column;
            align-items: center;
          }
          .team-card-bend {
            width: min(260px, 85vw);
          }
          .team-card-bend:hover {
            transform: translateY(-8px) scale(1.02) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Team;
