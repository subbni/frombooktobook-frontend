import './style.css';

const PageTemplate = ({ children }) => {
  return (
    <div className="templateBlock">
      <div className="whiteBox"> {children}</div>
    </div>
  );
};

export default PageTemplate;
