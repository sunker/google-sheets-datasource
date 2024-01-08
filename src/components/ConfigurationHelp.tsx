import React, { useState } from 'react';
import { Collapse, useTheme2 } from '@grafana/ui';
import { GoogleSheetsAuth } from '../types';

interface Props {
  authenticationType: string;
}

export const ConfigurationHelp = ({ authenticationType }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme2();

  const renderHelpBody = () => {
    switch (authenticationType) {
      case GoogleSheetsAuth.API:
        return (
          <>
            <h4>Generate an API key</h4>
            <ol style={{ listStylePosition: 'inside' }}>
              <li>
                Open the{' '}
                <a
                  href="https://console.developers.google.com/apis/credentials"
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ color: theme.colors.text.link }}
                >
                  Credentials page
                </a>{' '}
                in the Google API Console.
              </li>
              <li>
                Click <strong>Create Credentials</strong> and then click <strong>API key</strong>.
              </li>
              <li>
                Before using Google APIs, you need to turn them on in a Google Cloud project.{' '}
                <a
                  href="https://console.cloud.google.com/apis/library/sheets.googleapis.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ color: theme.colors.text.link }}
                >
                  Enable the API
                </a>
              </li>
              <li>
                Copy the key and paste it in the API Key field above. The file contents are encrypted and saved in the
                Grafana database.
              </li>
            </ol>
          </>
        );
      case GoogleSheetsAuth.GCE:
        return (
          <>
            <p>
              When Grafana is running on a Google Compute Engine (GCE) virtual machine, Grafana can automatically
              retrieve default credentials from the metadata server. As a result, there is no need to generate a private
              key file for the service account. You also do not need to upload the file to Grafana. The following
              preconditions must be met before Grafana can retrieve default credentials.
            </p>

            <ol style={{ listStylePosition: 'inside', marginBottom: theme.spacing() }}>
              <li>
                You must create a Service Account for use by the GCE virtual machine. For more information, refer to{' '}
                <a
                  href="https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances#createanewserviceaccount"
                  target="_blank"
                  style={{ color: theme.colors.text.link }}
                  rel="noreferrer noopener"
                >
                  Create new service account
                </a>
                .
              </li>
              <li>
                Verify that the GCE virtual machine instance is running as the service account that you created. For
                more information, refer to{' '}
                <a
                  href="https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances#using"
                  target="_blank"
                  style={{ color: theme.colors.text.link }}
                  rel="noreferrer noopener"
                >
                  setting up an instance to run as a service account
                </a>
                .
              </li>
              <li>Allow access to the specified API scope.</li>
            </ol>

            <p>
              For more information about creating and enabling service accounts for GCE instances, refer to{' '}
              <a
                href="https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances"
                target="_blank"
                style={{ color: theme.colors.text.link }}
                rel="noreferrer noopener"
              >
                enabling service accounts for instances in Google documentation
              </a>
              .
            </p>
          </>
        );
      default:
        // Default is JWT
        return (
          <>
            <h4>Generate a JWT file</h4>
            <ol style={{ listStylePosition: 'inside', marginBottom: theme.spacing() }}>
              <li>
                Open the{' '}
                <a
                  href="https://console.developers.google.com/apis/credentials"
                  target="_blank"
                  style={{ color: theme.colors.text.link }}
                  rel="noreferrer noopener"
                >
                  Credentials
                </a>{' '}
                page in the Google API Console.
              </li>
              <li>
                Click <strong>Create Credentials</strong> then click <strong>Service account</strong>.
              </li>
              <li>On the Create service account page, enter the Service account details.</li>
              <li>
                On the <code>Create service account</code> page, fill in the <code>Service account details</code> and
                then click <code>Create</code>
              </li>
              <li>
                On the <code>Service account permissions</code> page, don&rsquo;t add a role to the service account.
                Just click <code>Continue</code>
              </li>
              <li>
                In the next step, click <code>Create Key</code>. Choose key type <code>JSON</code> and click{' '}
                <code>Create</code>. A JSON key file will be created and downloaded to your computer
              </li>
              <li>
                Open the{' '}
                <a
                  href="https://console.cloud.google.com/apis/library/sheets.googleapis.com?q=sheet"
                  target="_blank"
                  style={{ color: theme.colors.text.link }}
                  rel="noreferrer noopener"
                >
                  Google Sheets
                </a>{' '}
                in API Library and enable access for your account
              </li>
              <li>
                Open the{' '}
                <a
                  href="https://console.cloud.google.com/apis/library/drive.googleapis.com?q=drive"
                  target="_blank"
                  style={{ color: theme.colors.text.link }}
                  rel="noreferrer noopener"
                >
                  Google Drive
                </a>{' '}
                in API Library and enable access for your account. Access to the Google Drive API is used to list all
                spreadsheets that you have access to.
              </li>
              <li>
                Share any private files/folders you want to access with the service account&apos;s email address. The
                email is specified as <code>client_email</code> in the Google JWT File.
              </li>
              <li>
                Drag the file to the dotted zone above. Then click <code>Save & Test</code>. The file contents will be
                encrypted and saved in the Grafana database.
              </li>
            </ol>
          </>
        );
    }
  };
  return (
    <Collapse
      collapsible
      label="Configure Google Sheets Authentication"
      isOpen={isOpen}
      onToggle={() => setIsOpen((x) => !x)}
    >
      {renderHelpBody()}
    </Collapse>
  );
};
