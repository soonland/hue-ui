import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
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
      <Grid>
        <Row>
          {banners &&
            banners.length > 0 &&
            banners.map((data, index) => {
              const k = `key${index}`;
              return (
                <Col xs={4} key={k}>
                  {data.title}
                  <hr />
                  {data.text}
                </Col>
              );
            })}
        </Row>
      </Grid>
    </>
  );
};

export default Home;
