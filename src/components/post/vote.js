import { useState, useEffect, useContext } from "react";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import FirebaseContext from '../../context/firebase';
import useCheckVotes from '../../hooks/use-check-votes';


export default function Vote({ user, content, linkdb }) {
    const { database } = useContext(FirebaseContext);
    const { isVoted, id, setIsVoted } = useCheckVotes(user?.user_id, content?.key);
    const [vote_num, setVote_num] = useState(0);


    
    var vote_numbers = vote_num;
    useEffect(() => {
        async function getVotes() {
            await database
                .ref(`${linkdb}/${content?.key}`)
                .on('value', (snapshot) => {
                    if (snapshot.exists()) {
                        vote_numbers = snapshot.val().vote_numbers;
                        setVote_num(vote_numbers);
                    }
                });
        }
        getVotes();
    }, [vote_numbers]);

    const upvote = async (event) => {
        event.preventDefault();
        console.log('vote: ' + `${linkdb}/${content?.key}`);
        await database
            .ref('Votes')
            .push({
                post_id: content?.key,
                user_id: user?.user_id
            });
        await database
            .ref(`${linkdb}`)
            .child(content.key)
            .update({
                vote_numbers: vote_numbers + 1
            });
    };

    const downvote = async (event) => {
        event.preventDefault();
        await database
            .ref('Votes')
            .child(id)
            .remove();

        await database
            .ref(`${linkdb}`)
            .child(content.key)
            .update({
                vote_numbers: vote_numbers - 1
            });
    }

    return (
        <>
        {isVoted === false &&
            <ArrowDropUpIcon onClick={upvote} className="mr-1" />
        }

        {isVoted === true &&
            <ArrowDropDownIcon onClick={downvote} className="mr-1" />
        }

        <div>{vote_num}</div>
        </>
    );
}