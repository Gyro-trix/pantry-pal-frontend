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
    <div className="container text-center">
      <div className = "row row-cols-2" style={{ marginTop: 15, marginBottom: 15 }}>
        {displayStorage(allStorageDataStr,allStorageData,navigate)}
      </div>
    </div>
  )
}
export default Home;