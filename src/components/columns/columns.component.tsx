import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { COLUMN_ORDER, COLUMN_ALIGNMENT_STYLES, COLUMN_SIZING_STYLES } from "../stylingComponent/stylingComponent.component";
interface ColumnData {
    columnWidths: string;
    columnContentLaidOutFromLeftToRight: {
      fieldGroupName: string;
      columnOrder?: string;
      textText?: {
        leftTextBox: {
          alignBoxTo: string;
          leftTextBoxContent: string;
        };
        rightTextBox: {
          alignBoxTo: string;
          rightTextBoxContent: string;
        };
      };
      imageColumn?: {
        alignImageTo: string;
        imageUpload: {
          mediaItemUrl: string;
          altText: string;
        };
      };
      textColumn?: {
        alignTextColumnTo: string;
        textColumnContent: string;
      };
    }[];
  }
  
  const Columns: React.FC<{ columnData: ColumnData }> = ({ columnData }) => {
    return (
      <div key={uuidv4()} className={`columnLayout ${COLUMN_SIZING_STYLES[columnData.columnWidths]}`}>
        {columnData.columnContentLaidOutFromLeftToRight.map((columns) => {
          if (columns.fieldGroupName === 'Article_Articlefields_PageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_TextText') {
            return (
              <div key={uuidv4()} className="textTextColumn ">
                <div
                  key={uuidv4()}
                  className={`leftColumn ${COLUMN_ALIGNMENT_STYLES[columns.textText?.leftTextBox?.alignBoxTo ?? '']}`}
                  dangerouslySetInnerHTML={{ __html: columns.textText?.leftTextBox?.leftTextBoxContent ?? '' }}
                />
                <div
                  key={uuidv4()}
                  className={`rightColumn ${COLUMN_ALIGNMENT_STYLES[columns.textText?.rightTextBox?.alignBoxTo ?? '']}`}
                  dangerouslySetInnerHTML={{ __html: columns.textText?.rightTextBox?.rightTextBoxContent ?? '' }}
                />
              </div>
            );
          }
          if (columns.fieldGroupName === 'Article_Articlefields_PageLayoutFields_TwoColumnLayout_ColumnContentLaidOutFromLeftToRight_Image') {
            return (
              <div
                key={uuidv4()}
                className={`imageTextColumn ${COLUMN_ORDER[columns.columnOrder ?? '']}`}
              >
                <figure
                  key={uuidv4()}
                  className={`imageColumn ${COLUMN_ALIGNMENT_STYLES[columns.imageColumn?.alignImageTo ?? '']}`}
                >
                  <img
                    loading="lazy"
                    src={columns.imageColumn?.imageUpload.mediaItemUrl ?? ''}
                    alt={columns.imageColumn?.imageUpload.altText ?? ''}
                  />
                </figure>
                <div
                  key={uuidv4()}
                  className={`textColumn ${COLUMN_ALIGNMENT_STYLES[columns.textColumn?.alignTextColumnTo ?? '']}`}
                  dangerouslySetInnerHTML={{ __html: columns.textColumn?.textColumnContent ?? '' }}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };
  
  export default Columns;