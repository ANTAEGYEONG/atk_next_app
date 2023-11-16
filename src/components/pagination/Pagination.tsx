import "@/components/pagination/page.css"

export default function Pagination({pass, onClickPagerNo}){

    /*const onClickPagerNo = (n) => {
        pass.pageNo = n==0 ? 1:n;
        console.log( pass.pageNo)
    }*/

    const createPager = (pager) => {

        let _list = [];
        let _prePager : number = pager.totalSize - 1
        let _nxtPager : number = pager.rowSize
        let _endPager : number = (_prePager / _nxtPager) + 1

        //  let _endPagerNo=parseInt((pager.totalSize-1)/pager.rowSize)+1;
        let _endPagerNo : number = (_endPager == 0) ? 1 : _endPager;
        let _startBlock : number = ( (pager.pageNo-1) / pager.blockSize ) * (pager.blockSize + 1);
        let index : number = 0;
        let _endBlock : number = 0;
        let _nextBlock : number = 0;

        for(let i : number = _startBlock ; i <= _endPagerNo ; i++){

            if(index < pager.blockSize) {

                _list.push(i);
                _endBlock = i;

                if(i < _endPagerNo){
                    _nextBlock=i+1;
                }

                index++;

            } else {

                break;

            }
        }//end for

        pager.list = _list;
        pager.startBlock = _startBlock;
        pager.nextBlock = _nextBlock;
        pager.endSize = _endPagerNo;

        return pager;
    }

    console.log(pass.list)

    return(
        <>
            <div className="arrorw">
                {
                    pass == null || pass == undefined || pass.pageNo == 1 ? <></> : (
                        <a className="btn_arrow double_arrow_left none_active cursor-pointer" onClick={() => onClickPagerNo(1)}></a>
                    )
                }
                {
                    pass == null || pass == undefined || pass.pageNo == 1 ? <></> : (
                        <a className="btn_arrow one_arrow one_arrow_left none_active cursor-pointer" onClick={()=>onClickPagerNo(pass.pageNo-1)}></a>
                    )
                }

                <ul className="page_num">
                    {
                        pass == null || pass == undefined || pass.list.length == 0 ? <></> :
                            pass.list.map((item, index) => {
                                return(
                                    <li onClick={()=>onClickPagerNo(item)} key={index} className={`btn_number cursor-pointer ${item == (pass.pageNo == 0 ? 1 : pass.pageNo) ? 'active' : ""}`}>
                                        {item}
                                    </li>
                                )
                            })
                    }
                </ul>

                {
                    pass == null || pass == undefined || pass.pageNo == pass.endSize ? <></> :
                        <a className="btn_arrow one_arrow one_arrow_right none_active cursor-pointer" onClick={()=>onClickPagerNo(pass.pageNo+1)}></a>
                }
                {
                    pass == null || pass == undefined || pass.pageNo == pass.endSize ? <></> :
                        <a className="btn_arrow double_arrow_right none_active cursor-pointer" onClick={()=>onClickPagerNo(pass.endSize)}></a>
                }

            </div>
        </>
    )
}
