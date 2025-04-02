'use client';
import { instance } from '@/axios';
import { tritem } from '@/types';
import { useEffect, useState } from 'react';
import Toppart from '../components/Toppart';

const TransationList = () => {
  const [result, setResult] = useState< { items: tritem[]; filteredBy: string } | null>(null)

  const [filter, setFilter] = useState({
    time: '7d',
    type: 'all',
  });

  useEffect(() => {
    try {
      instance
      .get(`/main/transactions?type=${filter.type}&time=${filter.time}`)
      .then((item) => {
        const reverseData=item.data.data?.items.reverse();
        const newArr={
          filteredBy:item.data.data.filteredBy,
          items:reverseData
        }
        setResult(newArr);
      });
    } catch  {
      console.log("Error");
    }
  }, [filter]);

  const handleChangeFilter = async (name: string, value: string) => {
    setFilter({ ...filter, [name]: value });
  };
  const totalAmount=result && result.items.reduce((acc,curr)=>acc+curr.amount,0)

  return (
    <div>
      {result?.items.length == 0 && (
        <p className="text-red-500 text-center mt-10">No Transaction found</p>
      )}

      {result==null && <p className='text-center text-red-500 pt-20'>No transaction found or wait just a minute...</p>}

      {result && (
        <>
          <div>
            <Toppart
              title="Transaction List "
              sortDesc={`The transactions  are showing at this moment.`}
            />
          </div>
          <div>
            <div>
              <div className="flex gap-2 md:w-2/4 mx-auto  items-center  justify-around">
                <div></div>
                <div className="w-full">
                  <p className="text-gray-400">Type</p>
                  <select
                    value={filter.type}
                    onChange={(e) => handleChangeFilter('type', e.target.value)}
                    name="type"
                    className="input"
                  >
                    <option value="all">all</option>
                    <option value="mobile_recharge">Mobile recharge</option>
                    <option value="send_money">Send money</option>
                    <option value="cash_out">Cash out</option>
                    <option value="bill">Bill</option>
                  </select>
                </div>
                <div className="w-full">
                  <p className="text-gray-400">Time</p>
                  <select
                    value={filter.time}
                    onChange={(e) => handleChangeFilter('time', e.target.value)}
                    name="date"
                    className="input"
                  >
                    <option value="all">all</option>
                    <option value="1d">1D</option>
                    <option value="7d">7D</option>
                    <option value="15d">15D</option>
                    <option value="1m">1M</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto p-4">
           <div className='grid  lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 leading-8 items-center   w-4/4 mx-auto py-2'>
           <h1> Total Amount : <span className='text-emerald-500  bg-emerald-100 px-2 rounded-md'> {totalAmount && totalAmount} BDT</span></h1>
           <h1> Total Transaction : <span className='text-emerald-500'> {result && result.items.length}</span></h1>
           <h1> Last : <span className='text-emerald-500'>{filter && filter.time=="all"?"Any":filter.time} Tranaction</span> </h1>
           <h1> Tranaction type : <span className='text-emerald-500'>{filter && filter.type=="all"?"Any":filter.type.split("_").join(" ")} </span> </h1>
           </div>
              <table className="min-w-full border rounded-lg shadow-2xl shadow-gray-50">
                <thead>
                  <tr className="bg-gray-700 text-gray-200">
                    <th className="p-2 border border-gray-200">Name</th>
                    <th className="p-2 border border-gray-200">Amount</th>
                    <th className="p-2 border border-gray-200">Number</th>
                    <th className="p-2 border border-gray-200">Type</th>
                    <th className="p-2 border border-gray-200">Time</th>
                    <th className="p-2 border border-gray-200">Added by</th>
                  </tr>
                </thead>
                <tbody>
                  {result &&
                    result.items?.map((item: tritem) => (
                      <tr
                        key={Math.random()}
                        className="text-center odd:bg-gray-50 even:bg-white"
                      >
                        <td className="p-2 border border-gray-200 capitalize">
                          {item.name}
                        </td>
                        <td className="p-2 border border-gray-200 ">
                          <p> {item.amount} BDT</p>
                        </td>
                        <td className="p-2 border border-gray-200">
                          {item.type == 'others' ? (
                            <p>xxxxxxxx </p>
                          ) : (
                            item.userNumber
                          )}
                        </td>
                        <td className="p-2 border border-gray-200">
                          {item.type.split('_').join(' ').toLocaleLowerCase()}
                        </td>
                        <td className="p-2 border border-gray-200">
                          {new Date(item.updatedAt)
                            .toLocaleString()
                            .split(',')
                            .join(' - ')}
                        </td>
                        <td  className="p-2 border border-gray-200">{item.addedBy}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TransationList;
