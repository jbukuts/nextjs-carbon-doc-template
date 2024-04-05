import { Tag, TagBaseProps } from '@carbon/react';
import { Apple, Calendar, Timer } from '@carbon/react/icons';
import { useFormatter, useTranslations } from 'next-intl';
import { toHoursAndMinutes } from '#/lib/helpers';

type TagProps = TagBaseProps;
type ContentLevel = 'L3' | 'L3+' | 'L4' | string;

interface UpdatedTagProps extends TagProps {
  updated: string;
}

interface ReadingTimeTagProps extends TagProps {
  timeToComplete: number;
}

interface ContentLevelTagProps extends Omit<TagProps, 'type'> {
  level: ContentLevel;
}

const DEF_TAG_TYPE: TagProps['type'] = 'blue';
const LEVEL_MAP: Record<ContentLevel, TagProps['type']> = {
  L3: 'blue',
  'L3+': 'teal',
  L4: 'purple'
};

export function UpdatedTag(props: UpdatedTagProps) {
  const { updated, type = DEF_TAG_TYPE, ...rest } = props;

  const t = useTranslations('components.PageHeader');
  const formatter = useFormatter();

  return (
    <Tag {...rest} renderIcon={Calendar} type={type}>
      {t('lastUpdated', {
        date: formatter.dateTime(new Date(updated), {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      })}
    </Tag>
  );
}

export function ReadingTimeTag(props: ReadingTimeTagProps) {
  const { timeToComplete, type = DEF_TAG_TYPE, ...rest } = props;

  return (
    <Tag {...rest} renderIcon={Timer} type={type}>
      {toHoursAndMinutes(timeToComplete)}
    </Tag>
  );
}

export function ContentLevelTag(props: ContentLevelTagProps) {
  const { level, ...rest } = props;

  const type = LEVEL_MAP[level] || 'magenta';
  return (
    <Tag {...rest} type={type} renderIcon={Apple}>
      {level}
    </Tag>
  );
}
