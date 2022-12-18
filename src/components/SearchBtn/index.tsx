import "./search_btn.scss";
export default function SearchBtn() {
  return (
    <div className="header-searchbar">
      <div className="header-search-input-item">
        <input type="text" placeholder="keywords"/>
      </div>
      <button className="header-search-btn">Search</button>
    </div>
  )
}