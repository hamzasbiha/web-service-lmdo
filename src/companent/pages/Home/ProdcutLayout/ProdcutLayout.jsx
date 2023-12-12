import React, { useEffect, useState } from "react";
import ListFilters from "./ListFilter/ListFilters";
import ProdcutGrid from "./ListProdcuts/ProdcutGrid";
import "./ProdcutLayout.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProdcuts } from "../../../../redux/products/productSlice";
import { useParams } from "react-router-dom";
import PagniteBottom from "./BottomPagnite/pagniteBottom";
import { animateScroll } from "react-scroll";

const ProdcutLayout = () => {
  const dispatch = useDispatch();
  const catgo = useParams();
  const data = useSelector((state) => state.product.Product);
  const loading = useSelector((state) => state.product.loading);
  const pending= useSelector((state)=>state.product.pending)
  const [filteredData, setFilteredData] = useState(data);
  const [sortedData, setSortedData] = useState([]);
  const [pages, setPages] = useState({});
  const [currentPages, setCurrentPage] = useState(1);
  const [isMouted, setIsMouted] = useState(false);
  const options = {
    // your options here, for example:
    duration: 1000,
    smooth: true,
  };
  useEffect(() => {
    const filter = {
      category: catgo.category,
    };

    dispatch(fetchProdcuts(filter));
    handleFilterChange(); // Initial filter
    if (!isMouted) {
      animateScroll.scrollToTop(options);
      setIsMouted(false);
    }
    // Include handleFilterChange as a dependency to avoid warnings
  }, [catgo.category, loading, isMouted]);
  const handleFilterChange = (selecFilt) => {
    const filt = data.filter(
      (item) =>
        selecFilt?.includes(item.typefood) || selecFilt?.includes(item.market)
    );
    setFilteredData(filt);
  };
  console.log(pending)
  return (
    <div className="ProdcutLayout">
      <div className="wrapper">
        <div className="left">
          <ListFilters
            data={data}
            onFilterChange={handleFilterChange}
            sortedData={sortedData}
            setSortedData={setSortedData}
          />
        </div>
        <div className="right">
          <ProdcutGrid
            data={data}
            filtTypFod={filteredData}
            pages={pages}
            setPages={setPages}
            setCurrentPage={setCurrentPage}
            currentPages={currentPages}
            sortedData={sortedData}
          />
        </div>
      </div>
      <PagniteBottom pages={pages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default ProdcutLayout;
