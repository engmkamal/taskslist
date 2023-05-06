import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'TaskslistSpfxWebPartStrings';
import TaskslistSpfx from './components/TaskslistSpfx';
import { ITaskslistSpfxProps } from './components/ITaskslistSpfxProps';
import { getGraph, getSP } from '../../pnpjsConfig';

//import { useCallback, useRef } from 'react';

export interface ITaskslistSpfxWebPartProps {
  description: string;
}

export default class TaskslistSpfxWebPart extends BaseClientSideWebPart<ITaskslistSpfxWebPartProps> {

  //private _isDarkTheme: boolean = false;
  //private _environmentMessage: string = '';



  public render(): void {
    const element: React.ReactElement<ITaskslistSpfxProps> = React.createElement(
      TaskslistSpfx,
      {        
        context: this.context,
        //onFilterTextChanged: this.onFilterTextBoxChanged
      }
    );
    
    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> { 

    getSP(this.context);
    getGraph(this.context);

  }



  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
