import SidebarItem from './SidebarItem';

const samples = [
  { id: 1, audio: 'http://localhost:3000/samples/Bass.mp3', title: 'Sample One' },
  { id: 2, audio: 'http://localhost:3000/samples/Drums.mp3', title: 'Sample Two' },
  { id: 3, audio: 'http://localhost:3000/samples/Guitar.mp3', title: 'Sample Three' },
  { id: 4, audio: 'http://localhost:3000/samples/Hammond.mp3', title: 'Sample Four' },
  { id: 5, audio: 'http://localhost:3000/samples/Vocals.mp3', title: 'Sample Five' },
];

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__title">
        Samples
      </div>
      <div className="sidebar__items">
        {samples.map(sample => (
          <SidebarItem key={sample.id} sample={sample} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar;
