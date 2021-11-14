import React from 'react';
import Loading from 'components/common/Loading';
import Title from 'components/common/Title';
import { useSelector } from 'react-redux';
import { getBanners, getLoadingBanners } from 'store/slices/commonSlice';

const Home = () => {
  const banners = useSelector(getBanners);
  const isLoading = useSelector(getLoadingBanners);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Title id="welcome" level="h1" />
      {banners &&
        banners.length > 0 &&
        banners.map((data, index) => {
          const k = `key${index}`;
          return (
            <div key={k}>
              {data.title}
              <hr />
              {data.text}
            </div>
          );
        })}
    </>
  );
};

export default Home;
