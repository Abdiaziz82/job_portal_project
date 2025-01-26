import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="browse-jobs">Browse Jobs</NavLink>
        </li>
        <li>
          <NavLink to="other-component">Other Component</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
