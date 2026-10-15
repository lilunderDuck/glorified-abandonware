import { GlobalHeader } from "../components";

export default function HomePage() {
  return (
    <>
      <GlobalHeader header="Springtime in Michigan" />
      <main>
        <p>Springtime in <a href="https://www.michigan.org/city/ann-arbor">Ann Arbor</a> is a beautiful time. Even though
          it can be chilly at times, it is nice to walk my dog Bacon. This site includes some pictures I have taken on
          these walks. 
        </p>

        <p>Sometimes we walk around the neighborhood, other times we make it to the woods. Ann Arbor also has some
          beautiful lakes and rivers including the <a
            href="https://www.annarbor.org/things-to-do/recreation-outdoors/huron-river/">Huron River Watertrail</a> and
          the <a href="https://www.a2gov.org/departments/Parks-Recreation/parks-places/argo/pages/default.aspx">Argo Park
            Cascades</a>.</p>
      </main>
      <footer>
        <p>This page was originally created by Colleen van Lent for the <a
            href="https://www.coursera.org/specializations/web-design"> Web Design for Everybody</a> Specialization.
          Specialization. Students are invited to make changes.</p>
      </footer>
    </>
  )
}