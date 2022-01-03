import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import * as ROUTES from '../../constants/routes';

export default function QuizInfor({ quizID, active, title, content, time, create_date, end_date, score }) {

  return (
    <div className="p-4 pt-2 pb-1" style={{borderRight: '1px solid rgba(0, 0, 0, 1)'}}>
      <p className="font-bold text-black-light text-2xl" >
        {title}
      </p>
      <p className="text-sm">{content}</p>
      <p className="font-bold mr-3">時間：{time}</p>
      <p className="font-bold mr-3">作成日：{create_date}</p>
      <p className="font-bold mr-3">終了日：{end_date}</p>
      <p className="font-bold mr-3">点数：{score}</p>
      {active === 1 ? (<Button variant="primary" href={`${ROUTES.QUIZ}/do/${quizID}`}>クイズ実行</Button>) : (<div> </div>)}
    </div>
  );
}

QuizInfor.propTypes = {
  quizID: PropTypes.string.isRequired,
  active: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  create_date: PropTypes.number.isRequired,
  end_date: PropTypes.number.isRequired,
};
