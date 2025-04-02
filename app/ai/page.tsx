'use client';

import React, { useState } from 'react';
import Toppart from '../components/Toppart';
import axios from 'axios';
import Image from 'next/image';
import { aiResponce } from '@/types';

const Page = () => {
  const api_Key =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJtYXphaGFydWwiLCJVc2VyTmFtZSI6Im1hemFoYXJ1bCIsIkFjY291bnQiOiIiLCJTdWJqZWN0SUQiOiIxOTA1NTQ5MzI3MzgwNTIxMDAwIiwiUGhvbmUiOiIiLCJHcm91cElEIjoiMTkwNTU0OTMyNzM3NjMyNjY5NiIsIlBhZ2VOYW1lIjoiIiwiTWFpbCI6IndvcmsubWF6YWhhcnVsQGdtYWlsLmNvbSIsIkNyZWF0ZVRpbWUiOiIyMDI1LTAzLTI4IDE3OjQ0OjAwIiwiVG9rZW5UeXBlIjoxLCJpc3MiOiJtaW5pbWF4In0.aGU0PuzXy1UwP_dFPGOCh7O8-h011gms1QHBB3HCVBrF09mpWlT-P4KXO436rOM_WoP0DPpYUHPGq-DMR6ORLb3TEzpjLG-C0pZK_mDZ2Q8KzaMYMREAHVa7MuVHYrcW9L_FcKfJaqACmu1rclU9W4hMBdSucJ-z0mM9diacUA4LAGGstKco6CVvz-Qvu3E3x4cs_GIAy136_73aw2MlZ199BoiUYjyhR8w6eem8Xmit9NGfIgUgLjmd3JZm18RThWQB5IRVeQ24Uac6-jJECbzXpsawlkEZUHmMQBSOXGyCOIYGsg6Q7g4r0pKkZcuwR8q_Ll0IpKKBck_mXhBUsA';

  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<aiResponce | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payLoad = {
      model: 'image-01',
      prompt: prompt,
      aspect_ratio: '2:3',
      response_format: 'url',
      n: 3,
      prompt_optimizer: true,
    };

    try {
      const responce = await axios.post(
        'https://api.minimaxi.chat/v1/image_generation',
        payLoad,
        {
          headers: {
            Authorization: `Bearer ${api_Key}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (responce.status == 200) {
        setResult(responce.data);
      }
    } catch {
      console.log('error occurd');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toppart
        title="Text to image"
        sortDesc="genarate your moner moto image"
      />
      <form className="w-1/3 mx-auto" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          className="input"
          placeholder="Enter your prompt"
        />
        <button className="primary-btn">
          {loading ? 'Genarating...' : 'Genarate'}
        </button>
      </form>

      {/* responce */}

      {loading ? <p>Image genarating...</p> : ''}

      <p className="text-red-400">{result && result.base_resp?.status_msg}</p>

      {result && result?.data?.image_urls !== null && (
        <div>
          <div>
            <div className="flex items-start">
              <p>Total image genarate : {result?.metadata?.success_count}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-10">
              {result?.data?.image_urls.map((item) => {
                return (
                  <div key={Math.random()} className="p-3">
                    <Image
                      src={item}
                      width={600}
                      height={700}
                      alt="images"
                      className="m-2"
                    />
                    <div className="text-center">
                      <button className="primary-btn text-center mx-auto w-fit">
                        Download
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
