import { NeonConnect } from '../../../../components/Services/Data/DataSources/CreateDataSource/Neon';
import { IndicatorCard } from '../../../../new-components/IndicatorCard';
import { useAppDispatch } from '../../../../storeHooks';
import { DriverInfo } from '../../../DataSource';
import { useMetadata } from '../../../hasura-metadata-api';
import { ConnectButton } from '../../components/ConnectButton';
import { DEFAULT_DRIVER } from '../../constants';

export const Cloud = ({
  selectedDriver,
  isDriverAvailable,
}: {
  selectedDriver: DriverInfo;
  isDriverAvailable: boolean;
}) => {
  const { data: sourceNames } = useMetadata(m =>
    m?.metadata.sources.map(s => s.name)
  );

  const dispatch = useAppDispatch();

  const selectedDriverName = selectedDriver?.name ?? DEFAULT_DRIVER.name;

  return (
    <>
      {selectedDriver?.name === 'postgres' && (
        <div className="mt-3" data-testid="neon-connect">
          <NeonConnect
            allDatabases={sourceNames ?? []}
            dispatch={dispatch}
            connectDbUrl={'data/v2/manage/connect'}
          />
        </div>
      )}

      {!isDriverAvailable ? (
        <div className="mt-3" data-testid="cloud-driver-not-available">
          <IndicatorCard
            status="negative"
            headline="Cannot find the corresponding driver info"
          >
            The response from<code>list_source_kinds</code>did not return your
            selected driver. Please verify if the data connector agent is
            reachable from your Hasura instance.
          </IndicatorCard>
        </div>
      ) : (
        <ConnectButton driverName={selectedDriverName} />
      )}
    </>
  );
};
