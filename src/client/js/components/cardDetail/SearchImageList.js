import React, { useState, useEffect } from "react";

import { Image, Dropdown } from "semantic-ui-react";

import UILoadingSpinner from "../sharedComponents/UILoadingSpinner";
import UIWrapper from "../sharedComponents/UIWrapper";
import UISmall from "../sharedComponents/UISmall";

const SearchImageList = ({ data, handleMakeCover }) => {
  const [images, setImages] = useState(null);
  const [lazyLoad, setLazyLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => setImages(data), 1000);
    return () => {
      setLazyLoad(false);
      setImages(null);
    };
  }, [data]);

  return (
    <UIWrapper className="images-container">
      {lazyLoad && !images ? (
        <UILoadingSpinner inverted={false} />
      ) : (
        images.map((image) => (
          <Dropdown.Item
            className="search-images-wrap"
            key={image.id}
            content={
              <UISmall className="image-owner">
                Image by:{" "}
                <a
                  className="image-owner"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={image.user.links.html}
                >
                  {image.user.first_name}
                </a>
              </UISmall>
            }
            image={
              <Image
                onClick={() => handleMakeCover(image.urls.full)}
                className="search-image"
                src={image.urls.small}
              />
            }
          />
        ))
      )}
    </UIWrapper>
  );
};

export default SearchImageList;
