import React, { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import PaintRow from './PaintRow';
import '../../components_style_sheet/paints_display_page/allPaintingsPage.css';

const AllPaintingsPage = () => {

  const [paintingsIds, setPaintingsIds] = useState(0)
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState({ itens: Array.from({ length: 4 }) })
  const [moreData, setMoreData] = useState(true)

  const query = {
    method: "GET"
  }

  useEffect(() => {
    setLoading(true)
    fetch('https://react-paint-library-backend.herokuapp.com/fetchAllPaintingData', query)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((data) => {
        const arr = []
        var subArr = []
        var i = 0
        data.paintingsIds.forEach((dataPoint, index, paintingsIds) => {
          subArr.push(parseInt(dataPoint.id))
          i++
          if(index === paintingsIds.length - 1){
            arr.push(subArr)
          }else if(i === 3){
            arr.push(subArr)
            subArr = []
            i = 0
          }
        })
        setPaintingsIds(arr)
        setLoading(false)
      })

  }, [])

  const fetchNewData = () => {
    setTimeout(() => {
      setRows({ itens: rows.itens.concat(Array.from({ length: 4})) })
    }, 1500)
    if(rows.itens.length > paintingsIds.length){
      setMoreData(false)
    }
  }

  if(loading){
    return(
      <div></div>
    )
  }else{
    return (
      <div className="pageContainerAllPaintings" id="mainScroller">
        <InfiniteScroll
          dataLength={rows.itens.length}
          next={fetchNewData}
          hasMore={moreData}
          loader={<h4>Loading...</h4>}
          scrollableTarget="mainScroller"
        >
        {rows.itens.map((i, index) => (
          <div className="divStyle" key={index}>
            <PaintRow id={paintingsIds[index]}/>
          </div>
        ))}
        </InfiniteScroll>
      </div>
    )
  }
  
}

export default AllPaintingsPage

