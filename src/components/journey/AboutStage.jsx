import { Code2, Network, Users } from 'lucide-react'
import { about, profile } from '../../data/portfolio'
import { StageHeading } from './Stage'

const nodes = [
  {
    id: 'interests',
    icon: Code2,
    label: 'What I like working on',
    text: about.interests,
  },
  {
    id: 'approach',
    icon: Network,
    label: 'How I work',
    text: about.approach,
  },
  {
    id: 'collaboration',
    icon: Users,
    label: 'Learning and collaboration',
    text: about.outsideDelivery,
  },
]

export default function AboutStage() {
  return (
    <>
      <StageHeading
        kicker="About"
        title="Who I am and"
        accent="what I enjoy."
        description={about.introduction}
      />

      <div className="about-network" data-reveal>
        <svg viewBox="0 0 1000 430" aria-hidden="true">
          <path d="M500 215 C370 78 252 83 123 112" />
          <path d="M500 215 C350 215 265 215 118 215" />
          <path d="M500 215 C370 350 258 344 126 316" />
          <path d="M500 215 C637 97 743 110 875 150" />
          <path d="M500 215 C650 292 745 289 875 260" />
        </svg>

        <div className="about-center">
          <span>HS</span>
          <strong>{profile.role}</strong>
          <small>{profile.location}</small>
        </div>

        {nodes.map(({ id, icon: Icon, label, text }, index) => (
          <article className={`about-node about-node-${index + 1}`} key={id}>
            <Icon size={20} />
            <div>
              <h3>{label}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}

        <div className="about-node about-node-role">
          <small>Current role</small>
          <strong>AI Engineer at Doctreen</strong>
        </div>
        <div className="about-node about-node-focus">
          <small>Focus</small>
          <strong>Software · Systems · Applied AI</strong>
        </div>
      </div>
    </>
  )
}
