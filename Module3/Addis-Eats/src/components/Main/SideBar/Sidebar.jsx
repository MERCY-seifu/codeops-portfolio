import './Sidebar.css'

function Sidebar() {
  const categories = ['All', 'Wats', 'Tibs', 'Vegetarian', 'Drinks']

  return (
    <aside className="sidebar">
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
