import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import * as ROUTES from '../../constants/routes';

export default function QuizInfor({ quizID, active, title, content, time, create_date, end_date, score }) {

  return (
    <div className="p-4 pt-2 pb-1 grid grid-infor-pre" style={{ borderRight: '1px solid rgba(0, 0, 0, 1)' }}>
      <div className='my-auto h-full'>
        <strong className="text-black-light text-2xl" >
          {title}
        </strong>
      </div>
      <div>
        <p className="text-xl">{content}</p>
      </div>
      <div className='grid grid-infor'>
        <strong className="">作成日：</strong>
        <strong className='text-end'>{create_date}</strong>
        <strong className="">終了日：</strong>
        <strong className='text-end'>{end_date}</strong>
        <strong className="">時間：</strong>
        <strong className='text-end'>{time}</strong>
        <strong className="">点数：</strong>
        <strong className='text-end'>{score}</strong>
      </div>
      <div>
        {active === 1 ? (<Button className="h-full" variant="primary" href={`${ROUTES.QUIZ}/do/${quizID}`}>クイズ実行</Button>) : (<div> </div>)}
      </div>
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
