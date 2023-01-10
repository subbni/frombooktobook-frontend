import fullHeartImg from '../../image/full_heart.png';
import emptyHeartImg from '../../image/empty_heart.png';
import './style.css';
const HeartButton = ({ clicked, onClick }) => {
  return (
    <img
      className="heartBtn"
      src={clicked ? fullHeartImg : emptyHeartImg}
      onClick={onClick}
    />
  );
};

export default HeartButton;
