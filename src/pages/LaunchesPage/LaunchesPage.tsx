import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Filter, Launch } from 'models/common';
import { getLaunchesPast } from 'graphql-service/spacex';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'components/Loader/Loader';
import LaunchItem from './LaunchItem';
import './LaunchesPage.scss';

function LaunchesPage() {
  const [filterField, setFilterField] = useState<Filter>({
    missionName: '',
    rocketName: '',
  });

  const [selectedLaunchesPast, setSelectedLaunchesPast] = useState<number[]>(
    []
  );

  const { data, loading, error, refetch, fetchMore } = useQuery(
    getLaunchesPast(),
    {
      variables: {
        offset: 0,
        limit: 10,
        missionName: '',
        rocketName: '',
      },
    }
  );

  const handleFilterField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFilterField({ ...filterField, [name]: value });
  };

  const submitFilterFiled = (e: React.SyntheticEvent) => {
    e.preventDefault();
    refetch({
      missionName: filterField.missionName,
      rocketName: filterField.rocketName,
    });
  };

  const handleSelectedLaunchesPast = (e) => {
    e.preventDefault();
    if (e.target.checked && selectedLaunchesPast.length <= 1) {
      setSelectedLaunchesPast([...selectedLaunchesPast, e.target.value]);
    }
    if (!e.target.checked) {
      setSelectedLaunchesPast(
        selectedLaunchesPast.filter((item) => item !== e.target.value)
      );
    }
  };

  const handleCompareLaunches = () => {
    const launches = data.launchesPast.filter((item) =>
      selectedLaunchesPast.includes(item.id)
    );
    console.log('Launches', launches);
  };

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        limit: 10,
        offset: data.launchesPast?.length,
      },
    });
  };

  if (loading) return <Loader />;
  if (error) return <p>{error?.message}</p>;

  return (
    <div className="LaunchesPage">
      <div className="header">
        <h1 className="pageTitle">Launches Past</h1>
        <div className="filter">
          <form onSubmit={submitFilterFiled}>
            <input
              name="missionName"
              value={filterField.missionName}
              onChange={handleFilterField}
              placeholder="Mission name"
            />
            <input
              name="rocketName"
              value={filterField.rocketName}
              onChange={handleFilterField}
              placeholder="Rocket name"
            />
            <button type="submit">Filter</button>
          </form>
        </div>
      </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleLoadMore}
        hasMore={true || false}
        loader={
          <div className="launches-loading" key={0}>
            Loading .....
          </div>
        }
      >
        {selectedLaunchesPast.length === 2 ? (
          <button type="button" onClick={handleCompareLaunches}>
            Compare Launches
          </button>
        ) : null}
        <div className="launches-list">
          {data ? (
            data?.launchesPast?.map((launch: Launch, index: number) => (
              <LaunchItem launch={launch} key={index} />
            ))
          ) : (
            <div>Record not found</div>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default LaunchesPage;
