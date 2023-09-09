import {
  Button,
  Container,
  DialogBox,
  DialogBoxBody,
  DialogBoxFooter,
  LangDisplay,
  Typography,
  Flex,
  CloseButton,
  Divider,
} from '@cypherock/cysync-ui';
import { JsonView, ScrollContainer } from '@cypherock/cysync-ui/src';
import React from 'react';

import { CoinIcon } from '~/components';
import { selectLanguage, useAppSelector } from '~/store';

import { useSignMessageDialog } from '../context';

export const ViewJSONDialog: React.FC = () => {
  const lang = useAppSelector(selectLanguage);
  const { buttons, signMessage } = lang.strings;
  const { json, dapp, wallet, account, onNext, onClose } =
    useSignMessageDialog();

  return (
    <DialogBox width={500} align="stretch" gap={0}>
      <Flex direction="row" justify="flex-end" py={2} px={3}>
        <CloseButton onClick={onClose} />
      </Flex>
      <Divider variant="horizontal" />
      <DialogBoxBody pt={0} pr={0} pb={0} pl={0} gap={0} align="stretch">
        <Container display="flex" direction="column" py={4} px={5}>
          <Typography variant="h5" $textAlign="center">
            <LangDisplay text={signMessage.title} />
          </Typography>
          <Typography variant="span" color="muted">
            <LangDisplay text={dapp.url} />
          </Typography>
        </Container>
        <Container
          display="flex"
          direction="column"
          align="stretch"
          gap={24}
          pt={2}
          pb={4}
          px={5}
        >
          <Container display="flex" direction="column" py={2} gap={16}>
            <Typography
              variant="h5"
              color="muted"
              $fontWeight="medium"
              $textAlign="center"
            >
              <LangDisplay text={signMessage.subTitle} />
            </Typography>
            <Flex gap={12} align="center">
              <Typography variant="span" $fontWeight="medium">
                <LangDisplay text={wallet.name} />
              </Typography>
              <Typography variant="span" $fontWeight="medium">
                /
              </Typography>
              <Flex gap={8} align="center">
                <CoinIcon assetId={account.assetId} size={16} />
                <Typography variant="span" $fontWeight="medium">
                  <LangDisplay text={account.name} />
                </Typography>
              </Flex>
            </Flex>
          </Container>
          <ScrollContainer $bgColor="container" p={2}>
            <Typography variant="span" color="muted" $fontSize={13}>
              <JsonView
                src={JSON.parse(json ?? '{}')}
                enableClipboard={false}
                displayObjectSize={false}
                displayDataTypes={false}
                indentWidth={4}
                collapsed={false}
              />
            </Typography>
          </ScrollContainer>
        </Container>
      </DialogBoxBody>
      <DialogBoxFooter>
        <Button
          variant="secondary"
          disabled={false}
          onClick={e => {
            e.preventDefault();
            onClose();
          }}
        >
          <LangDisplay text={buttons.reject} />
        </Button>
        <Button
          variant="primary"
          disabled={false}
          onClick={e => {
            e.preventDefault();
            onNext();
          }}
        >
          <LangDisplay text={buttons.continue} />
        </Button>
      </DialogBoxFooter>
    </DialogBox>
  );
};