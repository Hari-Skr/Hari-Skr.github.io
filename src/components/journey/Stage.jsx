export default function Stage({ id, children }) {
  return (
    <section className={`stage stage-${id}`} id={id}>
      <div className="stage-inner">
        <div className="stage-content">{children}</div>
      </div>
    </section>
  )
}

export function StageHeading({ kicker, title, accent, description }) {
  return (
    <div className="stage-heading" data-reveal>
      <p>{kicker}</p>
      <h2>
        {title} {accent && <em>{accent}</em>}
      </h2>
      {description && <div>{description}</div>}
    </div>
  )
}
