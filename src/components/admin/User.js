import React, { useEffect, useState, useContext } from "react";
import FirebaseContext from '../../context/firebase';
import { database } from "../../lib/firebase";
import './../../styles/admin.css';
import ReactPaginate from 'react-paginate';

export default function User() {

  const [data, setData] = useState([]);
  const [quiz, setQuiz] = useState({});
  const { database } = useContext(FirebaseContext);

  // set search
  const [all_table, setAllTable] = useState("mt-4 table table-hover text-center");
  const [search_table, setSearchTable] = useState("disable--search--table");
  const [paging, setPaging] = useState("d-flex flex-row-reverse");


  // search value
  const [value , setValue] = useState();

  //Pagination
  const itemsPerPage = 9;
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const handleLock = async (val, id) => {
    await database.ref('Users/' + id).set({
        avatar: val.avatar,
        group: val.group,
        status: 0,
        user_id: val.user_id,
        username: val.username,
      });
  }

  const handleUnLock = async (val, id) => {
    await database.ref('Users/' + id).set({
        avatar: val.avatar,
        group: val.group,
        status: 1,
        user_id: val.user_id,
        username: val.username,
      });
  }

  const handleSearch = () => {
    if (value != null && value != ''){
      console.log(value);
      setAllTable('disable--all--table');
      setSearchTable("mt-4 table table-hover text-center");
      setPaging('disable--paging');
    }
    else{
      setSearchTable('disable--search--table');
      setAllTable("mt-4 table table-hover text-center");
      setPaging("d-flex flex-row-reverse");
    }
  }

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

   

  useEffect(() => {
    async function getUser() {
        const snapshot = await database
            .ref('Users')
            .once("value");
        var result= [];
        if (snapshot.exists()){
            Object.keys(snapshot.val()).forEach(key => { result.push({
                id: key,
                val: snapshot.val()[key],
            })
        });
        setData(result);
        } 
    }
    getUser();
  }, [data]);

  useEffect(() => {
    async function getScore() {
      const snapshot = await database
          .ref('Quizs')
          .once("value");
      if (snapshot.exists()){
        setQuiz(snapshot.val());
      }
    }
    getScore();
  }, [quiz]);

  const Result = (e, i) => {
      const keys = Object.keys(quiz);
      var score = 0;
      keys.forEach(key => {
        if (quiz[key].done_user[e.val.username] != null){
          score += quiz[key].done_user[e.val.username].result;
        }
      });
      if (e.val.status == 0){
          return (
                <tr>
                  <td> {itemOffset+i+1}</td>
                  <td> {e.val.username}</td>
                  <td> {e.val.group} </td>
                  <td> {score}</td>
                  <td className="text-danger"> 禁止</td>
                  <td>
                    <button type="button" class="btn btn-danger" onClick={()=>handleLock(e.val, e.id)}>
                      禁止
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-success" onClick={()=>handleUnLock(e.val, e.id)}>
                      アクティブ
                    </button>
                  </td>
                </tr>
          );
      }
      else{
        return (
            <tr>
              <td> {itemOffset+i+1}</td>
              <td> {e.val.username}</td>
              <td> {e.val.group} </td>
              <td> {score}</td>
              <td className="text-success"> アクティブ</td>
              <td>
                <button type="button" class="btn btn-danger" onClick={()=>handleLock(e.val, e.id)}>
                  禁止
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-success" onClick={()=>handleUnLock(e.val, e.id)}>
                  アクティブ
                </button>
              </td>
            </tr>
          );
      }
  }


  const Search = (e, i, value) => {
    if (e.val.username == value){
      const keys = Object.keys(quiz);
      var score = 0;
      keys.forEach(key => {
        if (quiz[key].done_user[e.val.username] != null){
          score += quiz[key].done_user[e.val.username].result;
        }
      });
      if (e.val.status == 0){
        return (
              <tr>
                <td> {i+1}</td>
                <td> {e.val.username}</td>
                <td> {e.val.group} </td>
                <td> {score}</td>
                <td className="text-danger"> 禁止</td>
                <td>
                  <button type="button" class="btn btn-danger" onClick={()=>handleLock(e.val, e.id)}>
                    禁止
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-success" onClick={()=>handleUnLock(e.val, e.id)}>
                    アクティブ
                  </button>
                </td>
              </tr>
        );
      }
      else{
        return (
          <tr>
            <td> {i+1}</td>
            <td> {e.val.username}</td>
            <td> {e.val.group} </td>
            <td> {score}</td>
            <td className="text-success"> アクティブ</td>
            <td>
              <button type="button" class="btn btn-danger" onClick={()=>handleLock(e.val, e.id)}>
                禁止
              </button>
            </td>
            <td>
              <button type="button" class="btn btn-success" onClick={()=>handleUnLock(e.val, e.id)}>
                アクティブ
              </button>
            </td>
          </tr>
        );
      }
    }
  }

  return (
    <div className="m-4 pt-4 rounded bg-white h-screen w-full border-success border flex flex-col items-center sticky">
      <div className="m5 row w-90">
        <div className='col-md-7'></div>
        <div className="col-md-5">
          <input
            style={{marginRight: 50 + 'px'}}
            type="text"
            class="form-control"
            id="search_quizz"
            name="username"
            placeholder="検索"
            onChange={(e) => setValue(e.target.value)}
          ></input>
          <button style={{backgroundColor: 'green', 
                          color: 'white', 
                          position: 'absolute', 
                          top: 25 + 'px',
                          right: 5 + 'px',
                          padding: 6 + 'px',
                          borderRadius: 3 + 'px'
                        }}
                  onClick={handleSearch}
        >Search</button>
        </div>
        <table className={search_table}>
          <thead>
            <tr className="">
              <th>ID</th>
              <th>ユーザ名 </th>
              <th>グループ</th>
              <th>ポイント</th>
              <th>状態</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((e, i) => Search(e, i, value))
            }
          </tbody>
        </table>
        <table className={all_table}>
          <thead>
            <tr className="">
              <th>ID</th>
              <th>ユーザ名 </th>
              <th>グループ</th>
              <th>ポイント</th>
              <th>状態</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems?
              currentItems.map((e, i) => Result(e, i))
            :null}
          </tbody>
        </table>
        <div className={paging}>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
          />
        </div> 
      </div>
    </div>
  );
}