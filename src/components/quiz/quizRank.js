import { useEffect, useState, useContext } from 'react';
import useUser from '../../hooks/use-user';
import UserContext from '../../context/user';

export default function QuizRank({ doneUser }) {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const [data, setData] = useState([]);
    const [myData, setMyData] = useState();

    useEffect(() => {
        var doneUserTop3Arr = [];

        if (doneUser) {
            Object.keys(doneUser).map((key) => {
                var item = doneUser[key];
                item.user_name = key;

                doneUserTop3Arr.push(item);
            });
            doneUserTop3Arr.sort((a, b) => {
                if (b.result !== a.result) return b.result - a.result;
                if (b.time !== a.time) return a.time - b.time;
                return a.user_name - b.username
            });
            setData(doneUserTop3Arr.slice(0, 3));
            // console.log(doneUserTop3Arr.length);
        }
        // console.log(doneUser);
        // console.log(data);
        // console.log(myData);
    }, []);

    useEffect(() => {
        if (user) {
            setMyData(doneUser[`${user?.username}`]);
        }
    }, [user?.username]);

    return (
        <div className="p-4 pt-2 flex flex-col items-center w-full h-full justify-center">
            <p className="font-bold text-black-light text-2xl h-16" >
                上位の結果
            </p>
            <div className='grid grid-ranking w-full text-xl'>
                <strong className='bg-white'>名前</strong>
                <strong className='text-center bg-white'>正解</strong>
                <strong className='text-center bg-white'>時間</strong>
                <strong className='text-end bg-white'>合計ポイント</strong>
                {data && data?.length !== 0 ? (
                    data.map((doneUser) => {
                        return (
                            <>
                                <div className='bg-white'>{doneUser.user_name}</div>
                                <div className='text-center bg-white'>{doneUser.corrected}</div>
                                <div className='text-center bg-white'>{doneUser.time}</div>
                                <div className='text-end bg-white'>{doneUser.result}</div>
                            </>
                        )
                    })
                ) : null}
                {data && data?.length === 2 ? (
                    <>
                        <div className='bg-white'>-</div>
                        <div className='text-center bg-white'>-</div>
                        <div className='text-center bg-white'>-</div>
                        <div className='text-end bg-white'>-</div>
                    </>
                ) : data && data?.length === 1 ? (
                    <>
                        <div className='bg-white'>-</div>
                        <div className='text-center bg-white'>-</div>
                        <div className='text-center bg-white'>-</div>
                        <div className='text-end bg-white'>-</div>
                        <div className='bg-white'>-</div>
                        <div className='text-center bg-white'>-</div>
                        <div className='text-center bg-white'>-</div>
                        <div className='text-end bg-white'>-</div>
                    </>
                ) : data && data?.length === 0 ? (
                    <>
                        <div className='bg-white'>-</div>
                        <div className='text-center bg-white'>-</div>
                        <div className='text-center bg-white'>-</div>
                        <div className='text-end bg-white'>-</div>
                        <div className='bg-white'>-</div>
                        <div className='text-center bg-white'>-</div>
                        <div className='text-center bg-white'>-</div>
                        <div className='text-end bg-white'>-</div>
                        <div className='bg-white'>-</div>
                        <div className='text-center bg-white'>-</div>
                        <div className='text-center bg-white'>-</div>
                        <div className='text-end bg-white'>-</div>
                    </>
                ) : null}
                <strong className='bg-white'>私の成績：</strong>
                {myData ? (
                    <>
                        <div className='text-center bg-white'>{myData.corrected}</div>
                        <div className='text-center bg-white'>{myData.time}</div>
                        <div className='text-end bg-white'>{myData.result}</div>
                    </>
                ) : (
                    <>
                        <div className='text-center bg-white'>-</div>
                        <div className='text-center bg-white'>-</div>
                        <div className='text-end bg-white'>-</div>
                    </>
                )}

            </div>

        </div>

    );
}