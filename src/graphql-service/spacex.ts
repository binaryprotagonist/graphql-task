import { gql } from '@apollo/client';

export const getLaunchesPast = () => {
  return gql`
    query (
      $offset: Int
      $limit: Int
      $missionName: String
      $rocketName: String
    ) {
      launchesPast(
        offset: $offset
        limit: $limit
        find: { mission_name: $missionName, rocket_name: $rocketName }
      ) {
        id
        mission_name
        launch_date_local
        launch_site {
          site_name_long
        }
        launch_success
        links {
          wikipedia
        }
        rocket {
          rocket_name
          first_stage {
            cores {
              flight
              core {
                reuse_count
                status
              }
            }
          }
          second_stage {
            payloads {
              payload_type
              payload_mass_kg
            }
          }
          rocket_type
        }
      }
      ships {
        name
        home_port
        image
      }
    }
  `;
};
