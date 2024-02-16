import { useNavigate } from "react-router-dom";
import { displayStorage,gatherNotifications } from "../utils/storage";
import { ALL_STORAGES,CUR_ITEM_LIST } from "../config/localStorage"

function Home() {
  
  const allStorageDataStr = localStorage.getItem(ALL_STORAGES)
  const allStorageData = JSON.parse(allStorageDataStr)
  localStorage.setItem(CUR_ITEM_LIST, JSON.stringify([]))
  const navigate = useNavigate();
  gatherNotifications()

  return (
    <div className="card w-90" style={{ background: "lightblue", padding: 32}}>
      <div className = "row row-cols-auto" >
        {displayStorage(allStorageDataStr,allStorageData,navigate)}
      </div>
    </div>
  )
}
export default Home;