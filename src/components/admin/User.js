import React, { useEffect, useState } from "react";
import { database } from "../../lib/firebase";

export default function User() {

  const [data, setData] = useState([]);

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

  useEffect(() => {
    async function getQuizz() {
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
    getQuizz();
    console.log(data);
  });

  const Result = (e, i) => {
      if (e.val.status == 0){
          return (
                <tr>
                  <td> {i+1}</td>
                  <td> {e.val.username}</td>
                  <td> {e.val.group} </td>
                  <td> 1000</td>
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
              <td> 1000</td>
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

  return (
    <div className="m-4 pt-4 rounded bg-white h-screen w-full border-success border flex flex-col items-center sticky">
      <div className="m5 row w-90">
        <div className="col-md-7"></div>
        <div className="col-md-5">
          <input
            type="text"
            class="form-control"
            id="search_quizz"
            name="username"
            placeholder="検索"
          ></input>
        </div>
        <div>
        </div>

        <table className="mt-4 table table-hover text-center">
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
            {data.map((e, i) => Result(e, i))}
          </tbody>
        </table>
      </div>
    </div>
  );
}