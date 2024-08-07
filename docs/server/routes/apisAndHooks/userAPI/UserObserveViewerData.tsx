/** @jsxImportSource @emotion/react */

import apiData from 'docs/server/apiData/apiData.ts';
import UserAPI from 'docs/server/routes/apisAndHooks/userAPI/UserAPI.tsx';
import JsApiPage from 'docs/server/routes/apisAndHooks/JsApiPage.tsx';
import { adjustAutogeneratedProperties } from 'docs/server/ui/propertiesList/util.ts';

const uri = '/js-apis-and-hooks/user-api/observeViewerData';
const title = 'Observe logged-in user data';
const subtitle =
  'Observe data about the logged-in user to customize the experience';

const jsMethodData =
  apiData['types']['ICordUserSDK'].methods.methods['observeViewerData'];
const reactMethodData = apiData['react']['user']['useViewerData'];

function UserObserveViewerData() {
  return (
    <JsApiPage
      parent={UserAPI}
      title={title}
      subtitle={subtitle}
      jsMethodData={jsMethodData}
      reactMethodData={reactMethodData}
      availableData={adjustAutogeneratedProperties(
        apiData.types.ViewerUserData.properties,
        {
          moveToFront: [
            'id',
            'name',
            'shortName',
            'profilePictureURL',
            'metadata',
            'groupID',
          ],
        },
      )}
    />
  );
}

export default {
  uri,
  title,
  subtitle,
  Element: UserObserveViewerData,
};
